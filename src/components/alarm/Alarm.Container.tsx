import { FlatList, StyleSheet, View } from "react-native";
import AlarmItem from "./Alarm.Item";
import Text from "../Text";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { alarmList$, alarms } from "@/state/alarm/alarm.state";
import { useObservableState } from "@/hook/useObservableState";
import { AlarmResponse, getAlarmList } from "@/network/api";
import { useEffect } from "react";
import { local } from "@/state/auth/auth.state.local";

const AlarmContainer = () => {
  const alarmDataArr: readonly AlarmResponse[] =
    useObservableState({
      observable: alarmList$,
    }) ?? [];

  // console.log(JSON.stringify(alarmDataArr, null, 2));

  if (alarmDataArr.length === 0) {
    return (
      <View style={s.nothingTextContainer}>
        <Text style={s.nothingText}>알람을 추가해주세요.</Text>
      </View>
    );
  }

  return (
    <View style={s.root}>
      <FlatList
        data={alarmDataArr}
        renderItem={(data) => <AlarmItem {...data.item} />}
        horizontal={false}
        automaticallyAdjustKeyboardInsets
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.listView}
      />
    </View>
  );
};
export default AlarmContainer;

const s = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 16,
  },
  listView: {
    alignItems: "center",
  },
  nothingTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nothingText: {
    color: color.gray["200"],
    fontSize: font.title["2"].size,
    fontWeight: font.title["2"].weight,
  },
});
