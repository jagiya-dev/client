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
    console.log("Requesting permissions...");

    const {location, notification} = getPermissions();

    try {
        console.log("Requesting location permissions...");
        let authStatus = await requestForLocationPermission(location);
        onRequestedLocationPermission(authStatus);

        console.log("Requesting notification permissions...");
        authStatus = await requestForNotificationPermission(notification);
        onRequestedNotificationPermission(authStatus);
    } catch (err) {
        console.warn(err);
    }
}
