import Text from "@/components/Text";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { font } from "@/styles/font";
import { color } from "@/styles/color";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { BottomSheetScrollView, useBottomSheet } from "@gorhom/bottom-sheet";
import BottomButton from "@/components/fixed/BottomButton";
import {
  reminderItemsAndroid,
  reminderItemsIOS,
} from "@/screen/CreateAlarm/Reminder/Reminder.data";
import { behaviours } from "@/screen/CreateAlarm/Reminder/reminder.state";

const ReminderContainer = () => {
  const { close } = useBottomSheet();

  const onPress_saveReminder = () => {
    close();
  };

  const reminderItems =
    Platform.OS === "ios" ? reminderItemsIOS : reminderItemsAndroid;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    behaviours.setReminder(event.nativeEvent.contentOffset.y);
  };

  return (
    <View style={s.root}>
      <View style={s.titleContainer}>
        <Text style={s.title}>다시 알림</Text>
      </View>

      <View style={s.highlightingReminderItem} />

      <BottomSheetScrollView
        nestedScrollEnabled
        snapToAlignment={Platform.OS === "ios" ? "center" : "start"}
        snapToInterval={36}
        contentContainerStyle={s.reminderItemContainer}
        onScroll={handleScroll}
      >
        {reminderItems.map((item) => (
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
    // maxHeight: 36,
    // paddingVertical: 3,
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
    left: 20,
    ...Platform.select({
      ios: {
        top: "42%",
      },
      android: {
        top: "38%",
      },
    }),
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
