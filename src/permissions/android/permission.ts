import type {Permission} from "react-native";
import {PermissionsAndroid} from "react-native";

export const getPermissions = (): Record<string, Permission> => ({
    // 위치
    location: PermissionsAndroid.PERMISSIONS["ACCESS_FINE_LOCATION"], //"android.permission.ACCESS_FINE_LOCATION"

    // 알림
    notification: PermissionsAndroid.PERMISSIONS["POST_NOTIFICATIONS"] //"android.permission.POST_NOTIFICATIONS",

    // 'android.permission.ACCESS_FINE_LOCATION',
    // precise location x

    // 'android.permission.ACCESS_BACKGROUND_LOCATION',
    // geofence, persistent location sharing x

    // 앱 자동 시작
    // 나중에 필요하면 추가

    // 오버레이 렌더링
    // 최상단에 렌더하는 것까지는 필요 없음..
});
