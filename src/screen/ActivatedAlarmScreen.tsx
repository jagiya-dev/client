import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

const ActivatedAlarmScreen = () => {
  console.log("ActivatedAlarmScreen!!!!!!!!!!!!!");

  return (
    <View style={s.root}>
      <Text>Alarm Activated!!!!!!!!!!!!!</Text>
    </View>
  );
};

export default ActivatedAlarmScreen;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: widthPercentageToDP("100%"),
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
});