import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { widthPercentageToDP } from "react-native-responsive-screen";

type Props = {};

const MyInfoScreen = (props: Props) => {
  return (
    <SafeAreaView style={s.root}>
      <Text>My Info</Text>
    </SafeAreaView>
  );
};

export default MyInfoScreen;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: widthPercentageToDP("100%"),
    paddingHorizontal: 20,
  },
});
