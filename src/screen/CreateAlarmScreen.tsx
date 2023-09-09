import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

const CreateAlarmScreen = () => {
  return (
    <SafeAreaView style={s.root}>
      {/* 1. header */}
      <View style={s.header}>
        <Text>알람 추가</Text>
      </View>
    </SafeAreaView>
  )
};

export default CreateAlarmScreen;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: widthPercentageToDP("100%"),
    alignItems: "center"
  },
  header: {
    alignItems: "center",
  }
});
