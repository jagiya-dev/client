import { SafeAreaView, StyleSheet, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

const AlarmDeferScreen = () => {
  return (
    <SafeAreaView style={s.root}>

    </SafeAreaView>
  );
};

export default AlarmDeferScreen;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: widthPercentageToDP("100%"),
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  }
});
