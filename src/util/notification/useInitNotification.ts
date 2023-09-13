import notifee from "@notifee/react-native";
import { useEffect, useState } from "react";

export const useInitNotification = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      const initialNotification = await notifee.getInitialNotification();

      if (initialNotification) {
        console.log(
          "Notification caused application to open",
          initialNotification.notification,
        );
        console.log(
          "Press action used to open the app: ",
          initialNotification.pressAction,
        );
      }
    }
    bootstrap()
      .then(() => setLoading(false))
      .catch(console.error);
  }, []);

  return [loading];
};
