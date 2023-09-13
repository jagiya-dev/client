import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/button";
import { widthPercentageToDP } from "react-native-responsive-screen";
import notifee from "@notifee/react-native";

const AlarmScreen = () => {
  const onPressButton_CreateNewAlarm = async () => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    await notifee.displayNotification({
      title: "My notification title",
      body: "My notification body",
      android: {
        channelId,
        pressAction: {
          id: "default",
        },
      }
    });
  };

  return (
    <View style={s.root}>
      <Button onPress={onPressButton_CreateNewAlarm}>
        <Text>Create New Alarm!</Text>
      </Button>
    </View>
  )
};

export default AlarmScreen;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: widthPercentageToDP("100%"),
    justifyContent: "center",
    alignItems: "center"
  }
});
