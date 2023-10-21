import notifee from "@notifee/react-native";
import { useEffect } from "react";
import { Alert } from "react-native";

async function checkPowerManager() {
  // 1. get info on the device and the Power Manager settings
  const powerManagerInfo = await notifee.getPowerManagerInfo();
  if (powerManagerInfo.activity) {
    // 2. ask your users to adjust their settings
    Alert.alert(
      "Restrictions Detected",
      "To ensure notifications are delivered, please adjust your settings to prevent the app from being killed",
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: "OK, open settings",
          onPress: async () => await notifee.openPowerManagerSettings(),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false },
    );
  }
}

export const useAndroidPowerManager = () => {
  useEffect(() => {
    checkPowerManager();
  }, []);
};
