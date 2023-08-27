import { Button } from "@/components/Button";
import { SettingsIcon } from "@/components/Icon";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AlarmContainer from "@/components/alarm/Alarm.Container";

const dummy = {
  userName: "Jagiya",
  toolName: "우산",
} as const;

const MainScreen = () => {
  const { userName, toolName } = dummy;
  const [isDeleteMode, setDeleteMode] = useState(false);

  const onPressButton_toggleDeleteMode = (): void => {
    setDeleteMode((prev) => !prev);
  };

  return (
    <View style={s.root}>
      {/* 1. head */}
      <View style={s.headContainer}>
        <Text style={s.headText}>레디우산</Text>
        <SettingsIcon />
      </View>

      {/* 2. conversation */}
      <View style={s.conversationContainer}>
        <Text style={s.conversationText}>
          {userName}님, 오늘은&nbsp;
          <Text style={s.conversationToolNameText}>{toolName}</Text>을 꼭
          챙기세요!
        </Text>
      </View>

      {/* 3. Alarm Area */}
      <View style={s.alarmContainer}>
        {/* 3-1. Label */}
        <View style={s.alarmLabelContainer}>
          <Text style={s.alarmLabel}>My 알람</Text>
          <Button onPress={onPressButton_toggleDeleteMode}>
            {!isDeleteMode ? (
              <Text style={s.alarmEnableDeleteModeText}>삭제</Text>
            ) : (
              <Text style={s.alarmDisableDeleteModeText}>완료</Text>
            )}
          </Button>
        </View>

        {/* 3-2. Alarm Scroll View */}
        <AlarmContainer />
      </View>
    </View>
  );
};

export default MainScreen;

const s = StyleSheet.create({
  root: {
    width: wp("100%"),
    flex: 1,
    paddingHorizontal: 20,
  },
  headContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 52,
  },
  headText: {
    color: color.primary["600"],
    fontSize: 24,
    fontWeight: "800",
  },
  conversationContainer: {
    height: 64,
    marginBottom: 24,
  },
  conversationText: {
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    color: color.gray["700"],
  },
  conversationToolNameText: {
    color: color.primary["600"],
  },
  alarmContainer: {
    flex: 1,
  },
  alarmLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  alarmLabel: {
    fontSize: font.title["1"].size,
    fontWeight: font.title["1"].weight,
    color: color.gray["700"],
  },
  alarmEnableDeleteModeText: {
    fontSize: font.button["1"].size,
    fontWeight: font.button["1"].weight,
    color: color.gray["300"],
  },
  alarmDisableDeleteModeText: {
    fontSize: font.body["1"].size,
    fontWeight: font.button["1"].weight,
    color: color.primary["500"],
  },
});
