import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { widthPercentageToDP } from "react-native-responsive-screen";

type Props = {};

const SettingsScreen = (props: Props) => {
  return (
    <SafeAreaView style={s.root}>
      <Text>SettingsScreen</Text>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: widthPercentageToDP("100%"),
    paddingHorizontal: 20,
  },
});
