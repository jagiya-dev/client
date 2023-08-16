import { useEffect } from "react";
import { PermissionsAndroid, type Permission } from "react-native";

const getPermissions = (): Record<string, Permission> => ({
  // 위치
  location: "android.permission.ACCESS_COARSE_LOCATION",

  // 알림
  notification: "android.permission.POST_NOTIFICATIONS",

  // 'android.permission.ACCESS_FINE_LOCATION',
  // precise location x

  // 'android.permission.ACCESS_BACKGROUND_LOCATION',
  // geofence, persistent location sharing x

  // 앱 자동 시작
  // 나중에 필요하면 추가

  // 오버레이 렌더링
  // 최상단에 렌더하는 것까지는 필요 없음..
});

const useRequestPermissions_Android = () => {
  useEffect(() => {
    (async () => {
      try {
        const { location, notification } = getPermissions();

        // 위치 권한 요청.
        let granted = await PermissionsAndroid.request(location, {
          title: "위치 권한 요청",
          message: "위치기반 알람설정을 위해서 위치 권한 승인이 필요합니다.",
          buttonNeutral: "나중에 물어보기",
          buttonNegative: "거절",
          buttonPositive: "승인",
        });

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location");
        } else {
        }

        // 알림 권한 요청.
        granted = await PermissionsAndroid.request(notification, {
          title: "알림 권한 요청",
          message: "알림 및 알람을 위해 알림 권한 승인이 필요합니다.",
          buttonNeutral: "나중에 물어보기",
          buttonNegative: "거절",
          buttonPositive: "승인",
        });

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the notification");
        } else {
        }
      } catch (err) {
        console.warn(err);
      }
    })();
  }, []);
};

export default useRequestPermissions_Android;
