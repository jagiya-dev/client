import { PermissionsAndroid } from "react-native";
import type { Permission, PermissionStatus } from "react-native";

export const requestForNotificationPermission = async (notification: Permission) => {
  if (!(await PermissionsAndroid.check(notification))) return null;

  return await PermissionsAndroid.request(notification, {
    title: "알림 권한 요청",
    message: "알림 및 알람을 위해 알림 권한 승인이 필요합니다.",
    buttonNeutral: "나중에 물어보기",
    buttonNegative: "거절",
    buttonPositive: "승인",
  });
};

export const onRequestedNotificationPermission = (
  granted: PermissionStatus | null,
) => {
  if (granted === null) return;

  switch (granted) {
    case PermissionsAndroid.RESULTS.GRANTED:
      {
        console.log("You can use the notification");
      }
      break;

    case PermissionsAndroid.RESULTS.DENIED:
      break;

    case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
      break;
  }
};
