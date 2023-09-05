import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from "react-native";

export async function requestUserPermission(): Promise<void> {
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
    } else if (Platform.OS === 'android' && Platform.Version >= 33) {
        const authStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION);
        if (authStatus === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Authorization status:', authStatus);
        } else {

        }
    }
}
