import { StyleSheet, View } from "react-native";
import TextInput from "@/components/TextInput";
import Text from "@/components/Text";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { MapIcon, SearchIcon } from "@/components/Icon";
import { Button } from "@/components/button";
import { useObservableState } from "@/hook/useObservableState";
import {
  behaviours,
  searchInput$,
  searchResult$,
} from "@/state/addRegion/search/searchResults.state";
import { useEffect } from "react";

const recentSearches = [
  "서울시 관악구 봉천동",
  "서울시 강남구 역삼동",
  "서울시 용산구 청파동",
  "경기도 의정부시 민락동",
  "서울시 서대문구 북가좌1동",
];

const initialSearchResults = [
  "대전시 유성구 봉명동",
  "강원도 춘천시 효자동",
  "부산구 해운대구 우동",
  "서울시 중구 을지로동",
];

const SearchRegion = () => {
  const updateSearchKeywords = (input: string) => {
    behaviours.updateSearchKeywords(input);
  };

  const searchInput = useObservableState({
    observable: searchInput$,
  });
  const bHasSearched = searchInput !== "";

  const searchResults = useObservableState({
    observable: searchResult$,
  });

  if (searchResults) {
    console.log("search results: ", searchResults);
  }

  useEffect(() => {
    behaviours.reset();
  }, []);

  // useEffect(() => {
  //   behaviours.fetchRecentSearchResults();
  // }, []);

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

      {/*<BottomSheetScrollView>*/}
      {bHasSearched
        ? searchResults &&
          searchResults.map((data, i) => {
            console.log("data:", data);
            const { eupMyun, regionCd, cityDo, guGun } = data;
            // const location = (cityDo ?? "") + (guGun ?? "") + (eupMyun ?? "");
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
                </View>
              </View>
            );
          })
        : recentSearches.map((data, i) => (
            <View key={i} style={s.searchListRoot}>
              {/* 1. map icon with circle background */}
              <View style={s.mapIconBackground}>
                <MapIcon style={s.mapIcon} />
              </View>

              {/* 2. spacer */}
              <View style={s.itemSpacer} />

              {/* 3. location text */}
              <View style={s.rightContainer}>
                <Text>{data}</Text>

                <Button style={s.deleteButton}>
                  <Text style={s.deleteButtonInnerText}>삭제</Text>
                </Button>
              </View>
            </View>
          ))}
      {/*</BottomSheetScrollView>*/}
    </View>
  );
};
export default SearchRegion;

const s = StyleSheet.create({
  root: {
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
