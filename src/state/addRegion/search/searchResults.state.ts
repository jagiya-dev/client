import { BehaviorSubject } from "rxjs";
import { getRecentSelectLocation } from "@/network/api";
import { kakao } from "@/state/auth/auth.state.kakao";
import { local } from "@/state/auth/auth.state.local";
import { apple } from "@/state/auth/auth.state.apple";
import DeviceInfo from "react-native-device-info";

const searchResults = new BehaviorSubject<string[]>([]);
export const searchResults$ = searchResults.asObservable();

type RecentSearchResults = {
  data: string[];
};

const fetchRecentSearchResults = async () => {
  try {
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
    console.log("genRecentSearchResults", snsId, snsType);

    const response = await getRecentSelectLocation({
      snsId,
      snsType,
    });
    console.log(JSON.stringify(response.data, null, 2));

    // searchResults.next(json["data"] as string[]);
  } catch (error) {}
};

export const behaviours = {
  fetchRecentSearchResults,
};
