import notifee from "@notifee/react-native";
import { useEffect } from "react";
import { Alert } from "react-native";

async function checkBatteryOptimize() {
  // 1. checks if battery optimization is enabled
  const batteryOptimizationEnabled =
    await notifee.isBatteryOptimizationEnabled();
  if (batteryOptimizationEnabled) {
    // 2. ask your users to disable the feature
    Alert.alert(
      "Restrictions Detected",
      "To ensure notifications are delivered, please disable battery optimization for the app.",
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: "OK, open settings",
          onPress: async () => await notifee.openBatteryOptimizationSettings(),
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

export const useAndroidBatteryOptimize = () => {
  useEffect(() => {
    checkBatteryOptimize();
  }, []);
};
