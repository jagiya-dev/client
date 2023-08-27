import { SettingsIcon } from "@/components/Icon";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MainScreen = () => {
  return (
    <View style={s.root}>
      {/* 1. head */}
      <View style={s.headContainer}>
        <Text style={s.headText}>레디우산</Text>
        <SettingsIcon />
      </View>
    </View>
  );
};

export default MainScreen;

const s = StyleSheet.create({
  root: {
    width: wp("100%"),
    flex: 1,
    marginHorizontal: 20,
  },
  headContainer: {
    flexDirection: "row",
    marginHorizontal: "auto",
  },
  headText: {
    color: color.primary["600"],
    fontSize: 24,
    fontWeight: "800",
  },
});
