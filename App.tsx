import { NavigationContainer, createNavigationContainerRef, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Platform, StatusBar } from "react-native";

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
import CreateAlarmScreen from "@/screen/CreateAlarmScreen";
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
import { CloseIcon, LeftArrowIcon, RightArrowIcon } from "@/components/Icon";
import { font } from "@/styles/font";
import { useRef } from "react";
import AddRegionScreen from "@/screen/AddRegionScreen";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

ProcessPermission();

if (Platform.OS === "android") {
  handleBackgroundNotification();
}

const Stack = createNativeStackNavigator<StackParamList>();
const navRef = createNavigationContainerRef();

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
      <RecoilRoot>
        <RecoilDebugObserver instance={instance} />
        <StatusBar />
        <NavigationContainer ref={navRef}>
          <Stack.Navigator initialRouteName="CreateAlarm">
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
              name="CreateAlarm"
              component={CreateAlarmScreen}
              options={{
                title: "알람설정",
                headerRight: (props) => <CloseIcon onPress={() => navRef.navigate("Main")} useTouch />,
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: font.body["1"].size,
                  fontWeight: font.body["1"].weight,
                }
              }}
            />
            <Stack.Screen
              name="ActivatedAlarm"
              component={ActivatedAlarmScreen}
              options={{
                title: "",
                headerShown: false,
                gestureDirection: "horizontal",
              }}
            />
            <Stack.Screen
              name="AlarmDetail"
              component={AlarmDetailScreen}
              options={{ title: "", headerShown: false }}
            />
            <Stack.Screen
              name="AddRegion"
              component={AddRegionScreen}
              options={{
                title: "지역추가",
                headerLeft: (props) =>
                  <LeftArrowIcon
                    onPress={() => navRef.navigate("Main")}
                    useTouch
                  />,
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: font.body["1"].size,
                  fontWeight: font.body["1"].weight,
                }
              }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: "", headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </GestureHandlerRootView>);
};

export default Codepush.hoc(App);
