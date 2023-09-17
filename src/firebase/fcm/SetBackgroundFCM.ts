import messaging from "@react-native-firebase/messaging";
import {Alert, Platform} from "react-native";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log(`[${Platform.OS}] A new FCM message arrived (background or quit state): ${JSON.stringify(remoteMessage)}`);
    Alert.alert(
        `[${Platform.OS}] A new FCM message arrived (background or quit state): `,
        JSON.stringify(remoteMessage));
});

