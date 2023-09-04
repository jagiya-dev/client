/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {firebase} from "@react-native-firebase/messaging";

if (Platform.OS === 'android') {
    firebase.initializeApp({
        projectId: "",
        appId: "1:726991405564:android:1c4cdcabd725cd28bc7279",
        apiKey: "AIzaSyDiBovdm6V_ntkiQ5iYcYvETAAqOLuUhko",
        databaseURL: "",
        messagingSenderId: "",
        storageBucket: undefined,
        persistence: true,
    }, "readyUmbrella");

} else if (Platform.OS === 'ios') {
    firebase.initializeApp({
        projectId: "",
        appId: "1:726991405564:ios:af43900f3a4c49f2bc7279",
        apiKey: "AIzaSyApSyzwVlHuhVCXGzzaOgWX49nMVcI8IAY",
        databaseURL: "",
        messagingSenderId: "",
        storageBucket: undefined,
        persistence: true,
    }, "readyUmbrella");
}


AppRegistry.registerComponent(appName, () => App);
