import Text from "@/components/Text";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { font } from "@/styles/font";
import { color } from "@/styles/color";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { ReminderIntervalItem } from "@/typing";
import { useRef } from "react";
import { BottomSheetScrollView, useBottomSheet } from "@gorhom/bottom-sheet";
import { Button } from "@/components/button";
import BottomButton from "@/components/fixed/BottomButton";

const reminderIntervals: ReminderIntervalItem[] = [
  // {
  //   id: "0",
  //   label: "",
  // },
  {
    id: "1",
    label: "",
  },
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
  {
    id: "19",
    label: "",
  },
  // {
  //   id: "20",
  //   label: "",
  // },
];

const ReminderContainer = () => {
  const { close } = useBottomSheet();
  const scrollViewRef = useRef<ScrollView>(null);

  // useEffect(() => {
  //   scrollViewRef.current?.scrollTo({
  //     y: 36 + 6,
  //     animated: true,
  //   });
  // }, []);

  const onPress_saveReminder = () => {
    close();
  };

  return (
    <View style={s.root}>
      <View style={s.titleContainer}>
        <Text style={s.title}>다시 알림</Text>
      </View>

      <View style={s.highlightingReminderItem} />
      <BottomSheetScrollView
        // ref={scrollViewRef}
        nestedScrollEnabled
        snapToAlignment={Platform.OS === "ios" ? "center" : "start"}
        snapToInterval={Platform.OS === "ios" ? 36 : 36 - 10}
        contentContainerStyle={s.reminderItemContainer}
      >
        {reminderIntervals.map((item) => (
          <View key={item.id} style={s.reminderItem}>
            <Text style={s.reminderItemText}>{item.label}</Text>
          </View>
        ))}
      </BottomSheetScrollView>

      <BottomButton onPress={onPress_saveReminder} text="확인" />
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
    height: 36,
    paddingVertical: 3,
    // ...Platform.select({
    //   ios: {
    //     paddingVertical: 3,
    //   },
    //   android: {
    //     marginVertical: 3,
    //   },
    // }),
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

  saveContainer: {
    width: widthPercentageToDP("100%"),
    height: 102,

    ...Platform.select({
      android: {
        bottom: 40,
      },
      ios: {
        bottom: 0,
      },
    }),
    backgroundColor: "white",
    zIndex: 10,

    position: "absolute",
    left: 0,
    right: 0,

    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  saveButton: {
    backgroundColor: color.primary["600"],
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 99,
    width: 290,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonInnerText: {
    color: "white",
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    lineHeight: font.body["1"].height,
  },
});
