import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Text from "@/components/Text";

const PlaygroundScreen = () => {
  return (
    <SafeAreaView style={s.root}>
      <Text>Playground</Text>
    </SafeAreaView>
  );
};

export default PlaygroundScreen;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: wp("100%"),
    height: hp("100%"),

    justifyContent: "center",

    // ...StyleSheet.absoluteFillObject,
  },
});
