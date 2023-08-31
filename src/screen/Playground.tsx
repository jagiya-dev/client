import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Toggle from "@/components/toggle";
import Text from "@/components/Text";
import { color } from "@/styles/color";

const PlaygroundScreen = () => {
  return (
    <SafeAreaView style={s.root}>
      <View style={s.headerContainer}>
        <Text style={s.headerText}>Playground!</Text>
      </View>
      <Toggle />
    </SafeAreaView>
  );
};

export default PlaygroundScreen;

const s = StyleSheet.create({
  root: {
    width: widthPercentageToDP("100%"),
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: heightPercentageToDP("8%"),
  },
  headerText: {
    color: "black",
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
