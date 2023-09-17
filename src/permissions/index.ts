import { AndroidNotificationSetting } from "./../../node_modules/@notifee/react-native/src/types/NotificationAndroid";
import notifee, { AuthorizationStatus } from "@notifee/react-native";
import { requestPermissionsAndroid } from "@/permissions/android";
import { Platform } from "react-native";
import { requestPermissionsIOS } from "@/permissions/ios";

export async function ProcessPermission() {
  if (Platform.OS === "android") {
    requestPermissionsAndroid().then(() => {
      // console.log(`request for android permission done`);
    });
  }

  if (Platform.OS === "ios") {
    requestPermissionsIOS().then(() => {});
  }

  let settings = await notifee.requestPermission({
    announcement: true,
  });

  if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    console.log(`permission denied`);
  } else {
    console.log(`permission granted`);
  }
}
