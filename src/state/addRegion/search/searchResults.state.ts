import {
  BehaviorSubject,
  debounceTime,
  filter,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from "rxjs";
import {
  getRecentSelectLocation,
  LocationResponse,
  RecentLocation,
} from "@/network/api";
import { kakao } from "@/state/auth/auth.state.kakao";
import { local } from "@/state/auth/auth.state.local";
import { apple } from "@/state/auth/auth.state.apple";
import DeviceInfo from "react-native-device-info";
import { fromFetch } from "rxjs/fetch";

const searchInput = new BehaviorSubject<string>("");

export const searchInput$ = searchInput.asObservable();
export const searchResult$ = searchInput$.pipe(
  debounceTime(1000),
  filter((keyword) => keyword !== "" && keyword.length > 0),
  tap((keyword) => console.log("검색키워드: ", keyword)),
  mergeMap((keyword) =>
    fromFetch(
      `https://www.readyumbrelladata.com/location/getLocation?keyword=${keyword}`,
      {
        headers: {
          AccessToken: local.localAuthState.accessToken,
          RefreshToken: local.localAuthState.refreshToken,
        } as any,
      },
    ).pipe(
      switchMap((response) => {
        if (response.ok) {
          return response.json();
        }

        return of({
          error: true,
          message: `Error ${response.status}`,
        });
      }),
      map((result) => result.data as readonly LocationResponse[]),
    ),
  ),
);

const recentSearchResults = new BehaviorSubject<RecentLocation[]>([]);
export const recentSearchResults$ = recentSearchResults.asObservable();

export const selectedLocation = new BehaviorSubject<
  LocationResponse | undefined
>(undefined);
export const selectedLocationAsStr$ = selectedLocation.pipe(
  map((location) => {
    if (!location) return undefined;
    return `${location.cityDo} ${location.guGun} ${location.eupMyun}`;
  }),
);

const reset = () => {
  searchInput?.next("");
  recentSearchResults?.next([]);
  selectedLocation?.next(undefined);
};

const fetchRecentSearchResults = async (isAlreadyFetched: boolean) => {
  let snsId = "";
  let snsType = "";

  switch (local.localAuthState.whichLoginType) {
    case "kakao":
      snsId = kakao.kakaoProfile?.id ?? "";
      snsType = "1";
      break;

    case "apple":
      snsId = apple.appleInfo?.user ?? "";
      snsType = "2";
      break;

    case "guest":
      snsId = await DeviceInfo.getUniqueId();
      snsType = "0";
      break;
  }

  try {
    const response = await getRecentSelectLocation({
      snsId,
      snsType,
    });

    // console.log(JSON.stringify(response.data, null, 2));

    if (!response.data) throw new Error(response.message);

    if (isAlreadyFetched) return;

    recentSearchResults.next(response.data);
  } catch (error) {
    console.error("fetchRecentSearchResults", error);
  }
};
const deleteRecentSearchResult = (recentLocationId: number) => {
  const { value } = recentSearchResults;
  recentSearchResults.next(
    value.filter((x) => x.recentLocationId !== recentLocationId),
  );
};

const updateSearchKeywords = (keywords: string) => {
  searchInput.next(keywords);
};

const updateSelectedLocation = (location: LocationResponse) => {
  selectedLocation.next(location);
};

export const behaviours = {
  reset,

  updateSearchKeywords,

  updateSelectedLocation,

  fetchRecentSearchResults,
  deleteRecentSearchResult,
};
