import { FlatList, StyleSheet, View } from "react-native";
import AlarmItem from "@/components/alarm/Alarm.Item";
import Text from "../Text";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { AlarmModel } from "@/typing";

type AlarmContainerProps = {
  alarmModel: ReadonlyArray<AlarmModel>;
};

const AlarmContainer = (props: AlarmContainerProps) => (
  <View style={s.root}>
    {props.alarmModel?.length ? (
      <FlatList
        data={props.alarmModel}
        renderItem={(data) => <AlarmItem key={data.index} {...data.item} />}
        horizontal={false}
        automaticallyAdjustKeyboardInsets
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.listView}
      />
    ) : (
      <View style={s.nothingTextContainer}>
        <Text style={s.nothingText}>알람을 추가해주세요.</Text>
      </View>
    )}
  </View>
);
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
