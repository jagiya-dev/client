import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, StatusBar, StyleSheet } from "react-native";

import Codepush from "@/util/codepush";

import MainScreen from "@/screen/MainScreen";
import LoginScreen from "@/screen/LoginScreen";
import { RecoilRoot } from "recoil";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RecoilDebugObserver } from "reactotron-recoil-plugin";
import { instance } from "./reactotron.config";
import {
  useRegisterForegroundReceive
} from "@/firebase/fcm/useSetForegroundPushNotification";
import { ProcessPermission } from "@/permissions";
import { StackParamList } from "@/typing";
import AlarmScreen from "@/screen/AlarmScreen";
// import { useInitNotification } from "@/util/notification/useInitNotification";
// import { useHandleForegroundNotification } from "@/util/notification/useHandleForegroundNotification";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  handleBackgroundNotification
} from "@/util/notification/useHandleBackgroundNotification";
import {
  useAndroidBatteryOptimize
} from "@/util/notification/useAndroidBatterOptimize";
import {
  useAndroidPowerManager
} from "@/util/notification/useAndroidPowerManager";
import ActivatedAlarmScreen from "@/screen/ActivatedAlarmScreen";
import SettingsScreen from "@/screen/SettingsScreen";
import AlarmDetailScreen from "@/screen/AlarmDetailScreen";
import AlarmDeferScreen from "@/screen/AlarmDeferScreen";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

ProcessPermission();

if (Platform.OS === "android") {
  handleBackgroundNotification();
}

const Stack = createNativeStackNavigator<StackParamList>();

const App = () => {
  // run codepush first of all
  const { progress, bHasUpdate } = Codepush.useSyncOrUpdateCode();
  if (bHasUpdate) {
    return <Codepush.Panel progress={progress}/>;
  }

  useRegisterForegroundReceive();

  if (Platform.OS === "android") {
    useAndroidBatteryOptimize();
    useAndroidPowerManager();
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RecoilRoot>
        <RecoilDebugObserver instance={instance}/>
        <StatusBar/>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ActivatedAlarm">
            <Stack.Group>
              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ title: "", headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: "", headerShown: false }}
              />
              <Stack.Screen
                name="Alarm"
                component={AlarmScreen}
                options={{ title: "", headerShown: false }}
              />
              <Stack.Screen
                name="ActivatedAlarm"
                component={ActivatedAlarmScreen}
                options={{ title: "", headerShown: false }}
              />
              <Stack.Screen
                name="AlarmDetail"
                component={AlarmDetailScreen}
                options={{ title: "", headerShown: false }}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: "", headerShown: false }}
              />
            </Stack.Group>
            {/*<Stack.Group screenOptions={{ presentation: "fullScreenModal" }}>*/}
            {/*  <Stack.Screen*/}
            {/*    name="AlarmDefer"*/}
            {/*    component={AlarmDeferScreen}*/}
            {/*    options={{*/}
            {/*      title: "",*/}
            {/*      headerShown: false,*/}
            {/*      animation: "slide_from_bottom"*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</Stack.Group>*/}
          </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </GestureHandlerRootView>);
};

export default Codepush.hoc(App);
