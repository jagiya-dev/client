import notifee from "@notifee/react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export const useInitNotification = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    async function bootstrap() {
      if (Platform.OS === "android") {
        await notifee.createChannel({
          id: "readyUmbrella",
          name: "readyUmbrella",
        });
      }

      const initialNotification = await notifee.getInitialNotification();

      if (initialNotification) {
        console.log(
          Platform.OS + "Notification caused application to open",
          initialNotification.notification,
        );
        console.log(
          Platform.OS + "Press action used to open the app: ",
          initialNotification.pressAction,
        );

        navigation.navigate("ActivatedAlarm");
      } else {
        console.log(
          Platform.OS + ": App doesn't have any initial notification",
        );
      }
    }
    bootstrap()
      .then(() => setLoading(false))
      .catch(console.error);
  }, []);

  return loading;
};
