import messaging from "@react-native-firebase/messaging";

export async function requestPermissionsIOS() {
  let authStatus = await messaging().hasPermission();
  if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    // console.log("User already has notification permissions enabled.");
    return;
  }

  authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
}
