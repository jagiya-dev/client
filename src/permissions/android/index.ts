import {
    onRequestedLocationPermission,
    requestForLocationPermission,
} from "./location";
import {
    onRequestedNotificationPermission,
    requestForNotificationPermission,
} from "./notification";
import {getPermissions} from "./permission";

export async function requestPermissionsAndroid() {
    const {location, notification} = getPermissions();

    try {
        let authStatus = await requestForLocationPermission(location);
        onRequestedLocationPermission(authStatus);

        authStatus = await requestForNotificationPermission(notification);
        onRequestedNotificationPermission(authStatus);
    } catch (err) {
        console.warn(err);
    }
}
