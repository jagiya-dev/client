import Text from "@/components/Text";
import { ScrollView, StyleSheet, View } from "react-native";
import { font } from "@/styles/font";
import { color } from "@/styles/color";
import { widthPercentageToDP } from "react-native-responsive-screen";
import SnappingScrollSelector from "@/components/snappingScrollSelector";
import { ReminderIntervalItem } from "@/typing";
import { useEffect, useRef } from "react";

const reminderIntervals: ReminderIntervalItem[] = [
  // {
  //   id: "0",
  //   label: "",
  // },
  // {
  //   id: "1",
  //   label: "",
  // },
  {
    id: "2",
    label: "",
  },
  {
    id: "3",
    label: "",
  },
  {
    id: "4",
    label: "",
  },
  {
    id: "5",
    label: "",
  },
  {
    id: "6",
    label: "1분",
  },
  {
    id: "7",
    label: "3분",
  },
  {
    id: "8",
    label: "5분",
  },
  {
    id: "9",
    label: "10분",
  },
  {
    id: "10",
    label: "15분",
  },
  {
    id: "11",
    label: "30분",
  },
  {
    id: "12",
    label: "60분",
  },
  {
    id: "13",
    label: "",
  },
  {
    id: "14",
    label: "",
  },
  {
    id: "15",
    label: "",
  },
  {
    id: "16",
    label: "",
  },
  {
    id: "17",
    label: "",
  },
  {
    id: "18",
    label: "",
  },
  // {
  //   id: "19",
  //   label: "",
  // },
  // {
  //   id: "20",
  //   label: "",
  // },
];

const ReminderContainer = () => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      y: 36 + 6,
      animated: true,
    });
  }, []);

  return (
    <View style={s.root}>
      <View style={s.titleContainer}>
        <Text style={s.title}>다시 알림</Text>
      </View>

      <View style={s.highlightingReminderItem} />
      <ScrollView
        ref={scrollViewRef}
        nestedScrollEnabled
        snapToAlignment="center"
        decelerationRate={0}
        horizontal={false}
        // fadingEdgeLength={100}
        // overScrollMode="always"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        snapToInterval={36}
        contentContainerStyle={s.reminderItemContainer}
      >
        {reminderIntervals.map((item) => (
          <View key={item.id} style={s.reminderItem}>
            <Text style={s.reminderItemText}>{item.label}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default ReminderContainer;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: widthPercentageToDP("100%"),
    position: "relative",
  },

  titleContainer: {
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: font.button["1"].size,
    fontWeight: font.button["1"].weight,
    lineHeight: font.button["1"].height,
    color: color.gray["10"],
  },

  reminderItemContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  reminderItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
    height: 36,
    // width: "100%",
  },
  reminderItemText: {
    fontSize: font.selector["1"].size,
    fontWeight: font.selector["1"].weight,
    lineHeight: font.selector["1"].height,
    color: color.gray["700"],
  },
  highlightingReminderItem: {
    backgroundColor: color.gray["100"],
    borderRadius: 8,
    height: 36,
    width: "90%",

    position: "absolute",
    top: "42%",
    left: 20,
  },
});
