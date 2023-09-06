/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {requestFCMUserPermission} from "@/firebase/fcm/permission";
import messaging from '@react-native-firebase/messaging';

requestFCMUserPermission().then(() => {
    console.log("permission granted! " + Platform.OS);
}).catch((err) => {
    console.log("permission not granted! " + err + ", " + Platform.OS);
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!\n', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
