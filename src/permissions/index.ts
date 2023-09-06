import {requestPermissionsAndroid} from "@/permissions/android";
import {Platform} from "react-native";
import {requestPermissionsIOS} from "@/permissions/ios";

export function ProcessPermission() {
    if (Platform.OS === 'android') {
        requestPermissionsAndroid().then(() => {
            console.log(`request for android permission done`);
        });
    }

    if (Platform.OS === 'ios') {
        requestPermissionsIOS().then(() => {
        });
    }
}
