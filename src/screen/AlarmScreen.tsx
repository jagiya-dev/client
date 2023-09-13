import { Platform, StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/button";
import { widthPercentageToDP } from "react-native-responsive-screen";
import notifee from "@notifee/react-native";
import { setTrigger } from "@/util/trigger/setTrigger";
import { color } from "@/styles/color";

const AlarmScreen = () => {
  const onPressButton_CreateNewAlarm = async () => {
    await notifee.requestPermission();

    if (Platform.OS === "android") {
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
    }
    else {
      await notifee.displayNotification({
        title: "My notification title",
        body: "My notification body",
        ios: {

        }
      });
    }
  };

  const onPressButton_CreateNewTrigger = async () => {
    try {
      await setTrigger();
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={s.root}>
      <Button onPress={onPressButton_CreateNewAlarm} style={s.button}>
        <Text>Create New Alarm!</Text>
      </Button>

      <Button onPress={onPressButton_CreateNewTrigger} style={s.button}>
        <Text>Create Trigger!</Text>
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
    alignItems: "center",
    gap: 10
  },
  button: {
    width: 250,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: color.sub["300"],
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  }
});
