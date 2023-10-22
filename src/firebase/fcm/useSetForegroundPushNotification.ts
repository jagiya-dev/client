import { useEffect } from "react";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { Alert, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

async function getToken(messaging: FirebaseMessagingTypes.Module) {
  await messaging.registerDeviceForRemoteMessages();
  await messaging.getToken();
}

const listenToFCMMessage = async () => {
  const isEmulator = await DeviceInfo.isEmulator();

  if (isEmulator) return;

  const messenger = messaging();

  await getToken(messenger);

  messenger.onMessage(async (remoteMessage) => {
    Alert.alert(
      `[${Platform.OS}] A new FCM message arrived!`,
      JSON.stringify(remoteMessage),
    );
  });
};

export const useRegisterForegroundReceive = () => {
  useEffect(() => {
    listenToFCMMessage();
  }, []);
};
