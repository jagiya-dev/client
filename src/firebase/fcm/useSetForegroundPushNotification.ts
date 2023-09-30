import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { Alert, Platform } from "react-native";

async function getToken() {
  await messaging().registerDeviceForRemoteMessages();
  const pushToken = await messaging().getToken();
  // console.log(`[${Platform.OS}] push token: ${pushToken}`);
}

export const useRegisterForegroundReceive = () => {
  useEffect(() => {
    getToken().then();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        `[${Platform.OS}] A new FCM message arrived!`,
        JSON.stringify(remoteMessage),
      );
    });

    return unsubscribe;
  }, []);
};
