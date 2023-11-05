import { StyleSheet, View } from "react-native";
import TextInput from "@/components/TextInput";
import Text from "@/components/Text";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { SearchIcon } from "@/components/Icon";
import { useObservableState } from "@/hook/useObservableState";
import {
  behaviours as searchResultsBehaviours,
  searchInput$,
} from "@/state/addRegion/search/searchResults.state";
import React, { useCallback } from "react";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import SearchResultContents from "@/screen/AddRegion/Region/SearchResultContents";
import { useFocusEffect } from "@react-navigation/native";

const SearchRegion = () => {
  const updateSearchKeywords = (input: string) => {
    searchResultsBehaviours.updateSearchKeywords(input);
  };

  const searchInput = useObservableState({
    observable: searchInput$,
  });
  const bHasSearched = searchInput !== "";

  useFocusEffect(
    useCallback(() => {
      searchResultsBehaviours.reset();
    }, []),
  );

  return (
    <View style={s.root}>
      <View style={s.titleContainer}>
        <Text style={s.title}>지역 검색</Text>
      </View>

      <View style={s.regionSearchBarContainer}>
        <SearchIcon style={s.regionSearchBarIcon} />
        <TextInput
          style={s.regionSearchBar}
          placeholder="지역구, 동으로 검색"
          value={searchInput}
          onChangeText={updateSearchKeywords}
          autoFocus
          multiline={false}
        />
      </View>

      <View style={s.labelContainer}>
        <Text style={s.label}>{bHasSearched ? "주소 검색" : "최근 검색"}</Text>
      </View>

      <BottomSheetScrollView
        nestedScrollEnabled
        contentContainerStyle={s.searchListRoot}
      >
        <SearchResultContents />
      </BottomSheetScrollView>
    </View>
  );
};
export default SearchRegion;

const s = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    position: "relative",
  },
  titleContainer: {
    paddingVertical: 8,
    marginHorizontal: "auto",
    marginBottom: 16,
  },
  title: {
    fontSize: font.title["2"].size,
    fontWeight: font.title["2"].weight,
    lineHeight: font.title["2"].height,
    alignSelf: "center",
  },

  regionSearchBarContainer: {
    position: "relative",
  },
  regionSearchBar: {
    height: 45,

    backgroundColor: color.gray["100"],
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 32,
    paddingHorizontal: 37,
    paddingVertical: 13,
  },
  regionSearchBarIcon: {
    width: 18,
    height: 18,

    zIndex: 10,
    tintColor: color.gray["200"],
    marginRight: 5,

    position: "absolute",

    left: 15,
    top: 13,
  },
  regionSearchBarInnerText: {
    color: color.gray["300"],
    fontSize: font.body["5"].size,
    fontWeight: font.body["5"].weight,
    lineHeight: font.body["5"].height,
  },

  labelContainer: {
    // height: 6,
  },
  label: {
    color: color.gray["300"],
    fontSize: font.body["5"].size,
    fontWeight: font.body["5"].weight,
    lineHeight: font.body["5"].height,
  },

  searchListRoot: {
    flex: 1,
  },
});
