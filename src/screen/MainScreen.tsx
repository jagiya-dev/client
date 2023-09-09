import { Button } from "@/components/button";
import { RightArrowIcon, SettingsIcon } from "@/components/Icon";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import {
  GestureResponderEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AlarmContainer from "@/components/alarm/Alarm.Container";
import AddNewAlarmItemButton from "@/components/button/AddNewAlarmItem.button";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { alarmModel, genAlarmItem } from "@/state/alarm/alarm.state";

const MainScreen = () => {
  const [isDeleteMode, setDeleteMode] = useState(false);
  const setAlarm = useSetRecoilState(alarmModel);

  const onPressButton_toggleDeleteMode = () => {
    setDeleteMode((prev) => !prev);
    console.log("onPressButton_toggleDeleteMode");
  };

  const onPressButton_AddNewAlarmItem = (event: GestureResponderEvent) => {
    console.log("onClickAddNewAlarmItem");
    setAlarm((prev) => [genAlarmItem(), ...prev]);
  };

  const onPressButton_DetailButton = (event: GestureResponderEvent) => {
    console.log("onPressButton_DetailButton");
  };

  return (
    <SafeAreaView style={s.root}>
      <View style={s.innerRoot}>
        {/* 1. head */}
        <View style={s.headContainer}>
          <Text style={s.headText}>레디우산</Text>
          <SettingsIcon style={s.settingsIcon} useTouch />
        </View>

        {/* 2. conversation */}
        <View style={s.conversationContainer}>
          <Text style={s.conversationText}>오늘은 우산을 꼭 챙기세요!</Text>

          <Button style={s.detailButton} onPress={onPressButton_DetailButton}>
            <Text style={s.detailButtonText}>자세히 보기</Text>
            <RightArrowIcon />
          </Button>
        </View>

        {/* 3. Alarm Label */}
        <View style={s.alarmLabelContainer}>
          <Text style={s.alarmLabel}>My 알람</Text>
          <Button onPress={onPressButton_toggleDeleteMode}>
            <Text style={s.alarmToggleDeleteModeText}>
              {isDeleteMode ? "완료" : "삭제"}
            </Text>
          </Button>
        </View>
      </View>

      {/* 4. Alarm Scroll View */}
      <AlarmContainer />

      {/* 5. Add New Alarm Item Button and its additive shadow */}
      <View style={s.addNewAlarmItembuttonRoot}>
        <AddNewAlarmItemButton
          style={s.addNewAlarmItemButton}
          onPress={onPressButton_AddNewAlarmItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const s = StyleSheet.create({
  root: {
    width: wp("100%"),
    flex: 1,
  },
  innerRoot: {
    paddingHorizontal: 20,
  },
  headContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 72,
  },
  headText: {
    color: color.primary["600"],
    fontSize: 22,
    fontWeight: "800",
  },
  settingsIcon: {
    tintColor: color.gray["300"],
  },
  conversationContainer: {
    height: 68,
    // marginBottom: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  conversationText: {
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    color: color.gray["700"],
  },
  detailButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: color.primary["600"],
    paddingLeft: 16,
    paddingRight: 10,
    paddingVertical: 8,
    borderRadius: 24,
  },
  detailButtonText: {
    color: "white",
    fontSize: font.button["2"].size,
    fontWeight: font.button["2"].weight,
    marginRight: 4,
  },
  alarmLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  alarmLabel: {
    fontSize: font.title["1"].size,
    fontWeight: font.title["1"].weight,
    color: color.gray["700"],
  },
  alarmToggleDeleteModeText: {
    fontSize: font.body["2"].size,
    fontWeight: font.body["2"].weight,
    color: color.primary["600"],
  },
  alarmContainerView: {
    marginTop: 16,
  },
  addNewAlarmItembuttonRoot: {
    position: "relative",
  },
  addNewAlarmItemButton: {
    position: "absolute",
    right: 15,
    bottom: 39,
  },
});
