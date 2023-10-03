import {
  CloseIcon,
  DownArrowIcon,
  SearchIcon,
  TimeIcon,
} from "@/components/Icon";
import Text from "@/components/Text";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import BottomSheet, {
  EBottomSheetOpenState,
} from "@/components/bottom-sheet/BottomSheet";
import SearchResult from "@/screen/AddRegion/Region/SearchRegion";
import TimeTable from "@/screen/AddRegion/Time/TimeTable";
import { useObservableState } from "@/hook/useObservableState";
import {
  allTimeSelected$,
  behaviours,
} from "@/state/region/regionTimetable.state";
import { ETimeTableItemState, StackParamList } from "@/typing";
import { Button } from "@/components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type ScreenProps = NativeStackScreenProps<StackParamList, "AddRegion">;

const AddRegionScreen = ({ route, navigation }: ScreenProps) => {
  const [regionBottomSheetState, setRegionBottomSheetState] =
    useState<EBottomSheetOpenState>(EBottomSheetOpenState.CLOSE);

  const [timeBottomSheetState, setTimeBottomSheetState] =
    useState<EBottomSheetOpenState>(EBottomSheetOpenState.CLOSE);

  const allSelectedTimes = useObservableState({
    observable: allTimeSelected$,
  });

  const briefSelectedTimesAsFormattedString = (() => {
    if (allSelectedTimes === undefined) return "시간 선택";
    if (allSelectedTimes.length === 0) return "시간 선택";

    const cnt = allSelectedTimes.length - 1;
    if (cnt === 0) return allSelectedTimes?.[0].time;

    return `${allSelectedTimes?.[0].time} 외 ${cnt}건`;
  })();

  const deleteFromSelectedTimes = (index: number) => {
    if (!allSelectedTimes) return;

    const { time, isAM } = allSelectedTimes[index];

    if (isAM) {
      behaviours.updateTimeTableStateOfAMFromTime(
        time,
        ETimeTableItemState.none,
      );

      return;
    }

    behaviours.updateTimeTableStateOfPMFromTime(time, ETimeTableItemState.none);
  };

  const onPress_RegionSearchBar = () => {
    if (timeBottomSheetState === EBottomSheetOpenState.OPEN) {
      return;
    }

    setRegionBottomSheetState(EBottomSheetOpenState.OPEN);
  };

  const onPress_TimeContainer = () => {
    if (regionBottomSheetState === EBottomSheetOpenState.OPEN) {
      return;
    }

    setTimeBottomSheetState(EBottomSheetOpenState.OPEN);
  };

  const onPress_saveButton = () => {
    // todo: save operation!

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const onPress_closeButton = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={s.root}>
      {/* 1. forecast search bar */}
      <Text style={s.regionSearchBarLabel}>어떤 지역의 예보를 확인할까요?</Text>

      <TouchableNativeFeedback onPress={onPress_RegionSearchBar}>
        <View style={s.regionSearchBar}>
          <SearchIcon style={s.regionSearchBarIcon} />
          <Text style={s.regionSearchBarInnerText}>
            원하는 지역을 검색해주세요.
          </Text>
        </View>
      </TouchableNativeFeedback>

      {regionBottomSheetState === EBottomSheetOpenState.OPEN && (
        <BottomSheet
          bOpen={regionBottomSheetState}
          setIsOpen={setRegionBottomSheetState}
        >
          <SearchResult />
        </BottomSheet>
      )}

      {/* 2. select time table */}
      <Text style={s.regionSearchBarLabel}>
        어느 시간대의 예보를 확인할까요?
      </Text>

      <Shadow
        offset={[0, 2]}
        distance={2}
        startColor="rgba(0, 0, 0, 0.1)"
        style={s.timeContainerShadow}
        stretch
      >
        <TouchableNativeFeedback
          onPress={onPress_TimeContainer}
          style={s.timeTouchable}
        >
          <View style={s.timeContainer}>
            <View style={s.timeContainerLeft}>
              <TimeIcon />
              <Text style={s.timeContainerLeftLabel}>
                {briefSelectedTimesAsFormattedString}
              </Text>
            </View>
            <DownArrowIcon useTouch />
          </View>
        </TouchableNativeFeedback>
      </Shadow>

      {timeBottomSheetState === EBottomSheetOpenState.OPEN && (
        <BottomSheet
          bOpen={timeBottomSheetState}
          setIsOpen={setTimeBottomSheetState}
          height={85}
        >
          <TimeTable />
        </BottomSheet>
      )}

      {/* 저장 목록 */}
      <View style={s.selectedTimeContainer}>
        {allSelectedTimes !== undefined &&
          allSelectedTimes.length > 0 &&
          allSelectedTimes.map((data, i) => (
            <View key={i} style={s.selectedTimeItem}>
              <Text style={s.selectedItemText}>{data.time}</Text>
              <CloseIcon
                style={s.selectedTimeItemCloseIcon}
                useTouch
                onPress={() => deleteFromSelectedTimes(i)}
              />
            </View>
          ))}
      </View>

      <View style={s.spacer} />

      {/* save or cancel */}
      <View style={s.saveContainer}>
        <Button
          style={[s.applyButton, s.cancelButton]}
          onPress={onPress_closeButton}
        >
          <Text style={[s.applyLabel, s.cancelButtonLabel]}>취소</Text>
        </Button>

        <Button
          style={[s.applyButton, s.saveButton]}
          onPress={onPress_saveButton}
        >
          <Text style={[s.applyLabel, s.saveButtonLabel]}>저장</Text>
        </Button>
      </View>
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
  regionSearchBarLabel: {
    color: color.gray["700"],
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    lineHeight: font.body["1"].height,
    marginBottom: 16,
  },
  regionSearchBar: {
    height: 45,

    backgroundColor: color.gray["100"],
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 32,
    paddingHorizontal: 13,
    paddingVertical: 13,
  },
  regionSearchBarIcon: {
    width: 18,
    height: 18,
    tintColor: color.gray["200"],
    marginRight: 5,
  },
  regionSearchBarInnerText: {
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
  timeTouchable: {
    borderRadius: 8,
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

  selectedTimeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 54,
  },
  selectedTimeItem: {
    width: 98,

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    paddingHorizontal: 12,
    paddingVertical: 8,

    borderWidth: 1,
    borderColor: color.gray["200"],
    borderRadius: 8,
  },
  selectedItemText: {
    fontSize: font.body["2"].size,
    fontWeight: font.body["2"].weight,
    lineHeight: font.body["2"].height,
    color: color.gray["500"],
  },
  selectedTimeItemCloseIcon: {
    width: 18,
    height: 18,
    tintColor: color.gray["300"],
  },
  saveContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    ...Platform.select({
      android: {
        marginBottom: 100,
      },
      ios: {
        marginBottom: 40,
      },
    }),
  },
  applyButton: {
    minWidth: 170,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  applyLabel: {
    fontSize: font.title["2"].size,
    fontWeight: font.title["2"].weight,
    lineHeight: font.title["2"].height,
  },
  saveButton: {
    paddingHorizontal: 25,
    paddingVertical: 17,
    backgroundColor: color.primary["600"],
  },
  saveButtonLabel: {
    color: "white",
  },
  cancelButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: color.gray["100"],
  },
  cancelButtonLabel: {
    color: color.gray["700"],
    fontSize: font.title["2"].size,
    fontWeight: font.title["2"].weight,
    lineHeight: font.title["2"].height,
  },
  spacer: {
    flex: 1,
  },
});
