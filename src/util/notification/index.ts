import notifee from "@notifee/react-native";
import { Platform } from "react-native";

export const createNewAlarm = async () => {
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
  } else {
    await notifee.displayNotification({
      title: "My notification title",
      body: "My notification body",
      ios: {
        sound: "default",
      }
    });
  }
};
