import { Platform, StatusBar } from "react-native";

import Codepush from "@/util/codepush";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRegisterForegroundReceive } from "@/firebase/fcm/useSetForegroundPushNotification";
import { ProcessPermission } from "@/permissions";
// import { useInitNotification } from "@/util/notification/useInitNotification";
// import { useHandleForegroundNotification } from "@/util/notification/useHandleForegroundNotification";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { handleBackgroundNotification } from "@/util/notification/useHandleBackgroundNotification";
import { useAndroidBatteryOptimize } from "@/util/notification/useAndroidBatterOptimize";
import { useAndroidPowerManager } from "@/util/notification/useAndroidPowerManager";
import Navigation from "./Navigation";
import "react-native-get-random-values";

// init dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

ProcessPermission();

if (Platform.OS === "android") {
  handleBackgroundNotification();
}

const App = () => {
  // run codepush first of all
  const { progress, bHasUpdate } = Codepush.useSyncOrUpdateCode();
  if (bHasUpdate) {
    return <Codepush.Panel progress={progress} />;
  }

  useRegisterForegroundReceive();

  if (Platform.OS === "android") {
    useAndroidBatteryOptimize();
    useAndroidPowerManager();
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar />
      <Navigation />
    </GestureHandlerRootView>
  );
};

export default Codepush.hoc(App);
