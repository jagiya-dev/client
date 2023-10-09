import Text from "@/components/Text";
import { StyleSheet, View } from "react-native";
import { font } from "@/styles/font";
import { color } from "@/styles/color";
import { widthPercentageToDP } from "react-native-responsive-screen";

const ReminderContainer = () => {
  return (
    <View style={s.root}>
      <View style={s.titleContainer}>
        <Text style={s.title}>다시 알림</Text>
      </View>
    </View>
  );
};
export default ReminderContainer;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: widthPercentageToDP("100%"),
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
});
