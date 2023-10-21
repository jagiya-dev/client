import notifee, { AuthorizationStatus } from "@notifee/react-native";
import { requestPermissionsAndroid } from "@/permissions/android";
import { Platform } from "react-native";
import { requestPermissionsIOS } from "@/permissions/ios";

export async function ProcessPermission() {
  if (Platform.OS === "android") {
    await requestPermissionsAndroid();
  }

  if (Platform.OS === "ios") {
    await requestPermissionsIOS();
  }

  // init notifee
  const settings = await notifee.requestPermission({
    announcement: true,
  });

  if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    console.log(`permission denied`);
  } else {
    console.log(`permission granted`);
  }
}
