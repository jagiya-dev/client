import { DownArrowIcon, SearchIcon, TimeIcon } from "@/components/Icon";
import Text from "@/components/Text";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";

const AddRegionScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useRef<ReadonlyArray<string>>(["25%", "50%"]).current;

  const onChangeBottomSheet = (index: number) => {
    console.log("onChangeBottomSheet: ", index);
  };

  return (
    <SafeAreaView style={s.root}>
      {/* 1. forecast search bar */}
      <Text style={s.forecaseSearchBarLabel}>
        어떤 지역의 예보를 확인할까요?
      </Text>

      <View style={s.forecaseSearchBar}>
        <SearchIcon style={s.forecaseSearchBarIcon} />
        <Text style={s.forecaseSearchBarInnerText}>
          원하는 지역을 검색해주세요.
        </Text>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={onChangeBottomSheet}
      >
        <View>
          <Text>Awesome</Text>
        </View>
      </BottomSheet>

      {/* 2. select time table */}
      <Text style={s.forecaseSearchBarLabel}>
        어느 시간대의 예보를 확인할까요?
      </Text>

      <Shadow
        offset={[0, 2]}
        distance={2}
        startColor="rgba(0, 0, 0, 0.1)"
        style={s.timeContainerShadow}
        stretch
      >
        <View style={s.timeContainer}>
          <View style={s.timeContainerLeft}>
            <TimeIcon />
            <Text style={s.timeContainerLeftLabel}>시간 선택</Text>
          </View>
          <DownArrowIcon useTouch />
        </View>
      </Shadow>
    </SafeAreaView>
  );
};

export default AddRegionScreen;

const s = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },

  // 1. forecast search bar
  forecaseSearchBarLabel: {
    color: color.gray["700"],
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    lineHeight: font.body["1"].height,
    marginBottom: 16,
  },
  forecaseSearchBar: {
    height: 45,

    backgroundColor: color.gray["100"],
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 32,
    paddingHorizontal: 13,
    paddingVertical: 13,
  },
  forecaseSearchBarIcon: {
    width: 18,
    height: 18,
    tintColor: color.gray["200"],
    marginRight: 5,
  },
  forecaseSearchBarInnerText: {
    color: color.gray["300"],
    fontSize: font.body["5"].size,
    fontWeight: font.body["5"].weight,
    lineHeight: font.body["5"].height,
  },

  // 2. select time table
  timeContainerShadow: {
    ...Platform.select({
      android: {
        marginRight: 1,
        marginBottom: 2,
      },
    }),
  },
  timeContainer: {
    height: 54,

    paddingHorizontal: 16,
    paddingVertical: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",

    borderRadius: 8,
    backgroundColor: "white",
  },
  timeContainerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeContainerLeftLabel: {
    color: color.gray["500"],
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    lineHeight: font.body["1"].height,
    marginLeft: 6,
  },
});
