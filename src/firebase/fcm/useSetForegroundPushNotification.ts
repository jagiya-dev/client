import {useEffect} from "react";
import messaging from "@react-native-firebase/messaging";
import {Alert} from "react-native";

async function getToken() {
    const app = await messaging().getToken();
    console.log("push token: " + app);
}

export const useRegisterForegroundReceive = () => {
    useEffect(() => {
        getToken();
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, []);
}
