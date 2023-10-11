import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { Alert, Platform } from "react-native";
import DeviceInfo, { isEmulator } from "react-native-device-info";

async function getToken() {
  await messaging().registerDeviceForRemoteMessages();
  const pushToken = await messaging().getToken();
  // console.log(`[${Platform.OS}] push token: ${pushToken}`);
}

export const useRegisterForegroundReceive = () =>
  useEffect(() => {
    const impl = async () => {
      const isEmulator = await DeviceInfo.isEmulator();

      if (isEmulator) return;

      await getToken();

      messaging().onMessage(async (remoteMessage) => {
        Alert.alert(
          `[${Platform.OS}] A new FCM message arrived!`,
          JSON.stringify(remoteMessage),
        );
      });
    };

    impl();
  }, []);
