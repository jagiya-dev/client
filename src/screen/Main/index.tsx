import { Button } from "@/components/Button";
import { SettingsIcon } from "@/components/Icon";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { useRef } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AlarmContainer from "@/components/alarm/Alarm.Container";
import { atom, useRecoilState } from "recoil";

const dummy = {
  userName: "Jagiya",
  toolName: "우산",
} as const;

const useIsDeleteMode = atom({
  key: "isDeleteMode",
  default: false,
});

const MainScreen = () => {
  const { userName, toolName } = useRef(dummy).current;
  const [isDeleteMode, setDeleteMode] = useRecoilState(useIsDeleteMode);

  const onPressButton_toggleDeleteMode = () => {
    setDeleteMode((prev) => !prev);
  };

  return (
    <SafeAreaView style={s.root}>
      <View style={s.innerRoot}>
        {/* 1. head */}
        <View style={s.headContainer}>
          <Text style={s.headText}>레디우산</Text>
          <SettingsIcon useTouch />
        </View>

        {/* 2. conversation */}
        <View style={s.conversationContainer}>
          <Text style={s.conversationText}>
            {userName}님, 오늘은&nbsp;
            <Text style={s.conversationToolNameText}>{toolName}</Text>을 꼭
            챙기세요!
          </Text>
        </View>

        {/* 3. Alarm Label */}
        <View style={s.alarmLabelContainer}>
          <Text style={s.alarmLabel}>My 알람</Text>
          <Button onPress={onPressButton_toggleDeleteMode}>
            {isDeleteMode ? (
              <Text style={s.alarmDisableDeleteModeText}>완료</Text>
            ) : (
              <Text style={s.alarmEnableDeleteModeText}>삭제</Text>
            )}
          </Button>
        </View>
      </View>

      {/* 4. Alarm Scroll View */}
      <AlarmContainer />
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
  alarmContainerView: {
    marginTop: 16,
  },
});
