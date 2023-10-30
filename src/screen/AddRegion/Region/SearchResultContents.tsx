import {
  getRecentDeleteLocation,
  getRecentLocation,
  LocationResponse,
} from "@/network/api";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MapIcon } from "@/components/Icon";
import Text from "@/components/Text";
import { Button } from "@/components/button";
import React, { useCallback, useEffect } from "react";
import {
  behaviours,
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

  useEffect(() => {
    behaviours.fetchRecentSearchResults();
  }, []);

  const onPress_deleteRecentLocation = async (
    recentLocationId: number | undefined,
  ) => {
    if (!recentLocationId) return;

    try {
      await getRecentDeleteLocation({
        recentLocationId: recentLocationId.toString(),
      });

      behaviours.deleteRecentSearchResult(recentLocationId);
    } catch (err) {
      console.error(err);
    }
  };

  const onPress_selectLocation = useCallback(
    async (location: LocationResponse) => {
      behaviours.updateSelectedLocation(location);

      const { snsId, snsType } = await Local.getSnsInfo(
        local.localAuthState.whichLoginType,
      );

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
    },
    [searchResults],
  );

  const bHasSearched = searchResults && searchResults.length > 0;
  if (!bHasSearched) {
    return (
      <>
        {recentSearches &&
          recentSearches.length > 0 &&
          recentSearches.map((data, i) => {
            const { eupMyun, cityDo, guGun } = data;
            const location = `${cityDo} ${guGun} ${eupMyun}`;

            return (
              <View key={i} style={s.searchListRoot}>
                {/* 1. map icon with circle background */}
                <View style={s.mapIconBackground}>
                  <MapIcon style={s.mapIcon} />
                </View>

                {/* 2. spacer */}
                <View style={s.itemSpacer} />

                {/* 3. location text */}
                <View style={s.rightContainer}>
                  <Text>{location}</Text>

                  <Button
                    style={s.deleteButton}
                    onPress={() =>
                      onPress_deleteRecentLocation(data.recentLocationId)
                    }
                  >
                    <Text style={s.deleteButtonInnerText}>삭제</Text>
                  </Button>
                </View>
              </View>
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
            <View key={data.regionCd}>
              <TouchableOpacity
                style={s.searchListRoot}
                onPress={() => onPress_selectLocation(data)}
              >
                {/* 1. map icon with circle background */}
                <View style={s.mapIconBackground}>
                  <MapIcon style={s.mapIcon} />
                </View>

                {/* 2. spacer */}
                <View style={s.itemSpacer} />

                {/* 3. location text */}
                <View style={s.rightContainer}>
                  <Text>{location}</Text>
                </View>
              </TouchableOpacity>
            </View>
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
  mapIcon: {},

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
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: color.gray["100"],
    borderRadius: 16,
  },
  deleteButtonInnerText: {
    color: color.gray["700"],
    fontSize: font.body["2"].size,
    fontWeight: font.body["2"].weight,
    lineHeight: font.body["2"].height,
  },
});
