import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from "react-native";

export async function requestFCMUserPermission(): Promise<void> {
    if (Platform.OS === 'ios') {
        let authStatus = await messaging().hasPermission();
        if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            console.log("User already has notification permissions enabled.");
            return;
        }

        authStatus = await messaging().requestPermission();
        const bEnabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (bEnabled) {
            console.log('Authorization status:', authStatus);
        }
        return;
    }

    if (Platform.OS === 'android' && Platform.Version >= 33) {
        if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION)) {
            console.log("User already has notification permissions enabled.");
            return;
        }
        const authStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION);
        if (authStatus === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Authorization status:', authStatus);
        } else {

        }
    }
}
