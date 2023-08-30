import { FlatList, StyleSheet, View } from "react-native";
import AlarmItem from "@/components/alarm/Alarm.Item";
import { useState } from "react";
import { dummyAlarmData } from "@/state/alarm/dummy";

const AlarmContainer = () => {
  const [state, setState] = useState(dummyAlarmData);

  return (
    <View style={s.root}>
      <FlatList
        data={state}
        renderItem={(data) => <AlarmItem key={data.index} {...data.item} />}
        alwaysBounceVertical
        horizontal={false}
        bounces
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
});
