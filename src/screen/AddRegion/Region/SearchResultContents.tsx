import {
  getRecentDeleteLocation,
  getRecentLocation,
  LocationResponse,
} from "@/network/api";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MapIcon } from "@/components/Icon";
import Text from "@/components/Text";
import React, { useEffect } from "react";
import {
  behaviours as searchResultsBehaviours,
  recentSearchResults$,
  searchResult$,
} from "@/state/addRegion/search/searchResults.state";
import { useObservableState } from "@/hook/useObservableState";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { local, Local } from "@/state/auth/auth.state.local";

const SearchResultContents = () => {
  const { close } = useBottomSheet();
  const searchResults = useObservableState({
    observable: searchResult$,
  });

  const recentSearches = useObservableState({
    observable: recentSearchResults$,
  });

  recentSearches?.reverse();

  useEffect(() => {
    searchResultsBehaviours.fetchRecentSearchResults();
  }, []);

  const onPress_deleteRecentLocation = async (
    recentLocationId: number | undefined,
  ) => {
    if (!recentLocationId) return;

    try {
      await getRecentDeleteLocation({
        recentLocationId: recentLocationId.toString(),
      });

      searchResultsBehaviours.deleteRecentSearchResult(recentLocationId);
    } catch (err) {
      console.error(err);
    }
  };

  const onPress_selectLocation = async (location: LocationResponse) => {
    searchResultsBehaviours.updateSelectedLocation(location);

    const { snsId, snsType } = await local.getSnsInfo();

    const { data } = await getRecentLocation({
      eupMyun: location.eupMyun ?? "",
      guGun: location.guGun ?? "",
      cityDo: location.cityDo ?? "",
      regionCd: location.regionCd ?? "",
      snsId,
      snsType,
    });
    console.log("최근 검색 추가: ", JSON.stringify(data, null, 2));

    close();
  };

  const bHasSearched = searchResults && searchResults.length > 0;
  if (!bHasSearched) {
    return (
      <>
        {recentSearches &&
          recentSearches.length > 0 &&
          recentSearches.map((data, i) => {
            const { eupMyun, cityDo, guGun, regionCd } = data;
            const location = `${cityDo} ${guGun} ${eupMyun}`;

            return (
              <TouchableOpacity
                key={i}
                style={s.searchListRoot}
                onPress={() =>
                  onPress_selectLocation({
                    eupMyun,
                    cityDo,
                    guGun,
                    regionCd,
                  })
                }
              >
                {/* 1. map icon with circle background */}
                <View style={s.mapIconBackground}>
                  <MapIcon />
                </View>

                {/* 2. spacer */}
                <View style={s.itemSpacer} />

                {/* 3. location text */}
                <View style={s.rightContainer}>
                  <Text style={s.deleteButtonInnerText}>{location}</Text>

                  <TouchableOpacity
                    onPress={() =>
                      onPress_deleteRecentLocation(data.recentLocationId)
                    }
                  >
                    <View style={s.deleteButton}>
                      <Text style={s.deleteButtonInnerText}>삭제</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
      </>
    );
  }

  return (
    <>
      {searchResults.length > 0 &&
        searchResults.map((data) => {
          const { eupMyun, cityDo, guGun } = data;
          const location = `${cityDo} ${guGun} ${eupMyun}`;

          return (
            <TouchableOpacity
              style={s.searchListRoot}
              key={data.regionCd}
              onPress={() => onPress_selectLocation(data)}
            >
              {/* 1. map icon with circle background */}
              <View style={s.mapIconBackground}>
                <MapIcon />
              </View>

              {/* 2. spacer */}
              <View style={s.itemSpacer} />

              {/* 3. location text */}
              <View style={s.rightContainer}>
                <Text>{location}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
    </>
  );
};
export default SearchResultContents;

const s = StyleSheet.create({
  searchListRoot: {
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
  },

  mapIconBackground: {
    width: 26,
    height: 26,
    backgroundColor: color.gray["100"],
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },

  itemSpacer: {
    marginRight: 12,
  },

  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  deleteButton: {
    paddingVertical: 4,
    backgroundColor: color.gray["100"],
    borderRadius: 16,
    width: 58,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonInnerText: {
    color: "black",
    fontSize: font.caption["2"].size,
    fontWeight: font.caption["2"].weight,
    lineHeight: font.caption["2"].height,
  },

  locationText: {
    color: color.gray["700"],
    fontSize: font.body["2"].size,
    fontWeight: font.body["2"].weight,
    lineHeight: font.body["2"].height,
  },
});
