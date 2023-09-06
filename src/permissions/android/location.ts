import { PermissionsAndroid } from "react-native";
import type { Permission, PermissionStatus } from "react-native";

export const requestForLocationPermission = async (location: Permission) => {
  // if (!(await PermissionsAndroid.check(location))) return null;

  return await PermissionsAndroid.request(location, {
    title: "위치 권한 요청",
    message: "위치기반 알람설정을 위해서 위치 권한 승인이 필요합니다.",
    buttonNeutral: "나중에 물어보기",
    buttonNegative: "거절",
    buttonPositive: "승인",
  });
};

export const onRequestedLocationPermission = (granted: PermissionStatus | null) => {
  if (granted === null) return;

  switch (granted) {
    case PermissionsAndroid.RESULTS.GRANTED:
      {
        console.log("You can use the location");
      }
      break;

    case PermissionsAndroid.RESULTS.DENIED:
      break;

    case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
      break;
  }
};
