import type { StackParamList } from "@/typing";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import Screens from "@/screen";
import { font } from "@/styles/font";
import Text from "@/components/Text";

import BootSplash from "react-native-bootsplash";

import { CloseIcon, LeftArrowIcon } from "@/components/Icon";
import navUtils from "@/util/NavigationUtil";

const Stack = createNativeStackNavigator<StackParamList>();
export const navRef = createNavigationContainerRef();

const commonHeaderOptions: NativeStackNavigationOptions = {
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    fontFamily: "Pretendard",
  },
};

const onReady = async () => {
  await BootSplash.hide({ fade: true });
  console.log("BootSplash has been hidden successfully");
};

const Navigation = () => (
  <NavigationContainer ref={navRef} onReady={onReady}>
    <Stack.Navigator initialRouteName="Playground">
      <Stack.Screen
        name="Playground"
        component={Screens.PlaygroundScreen}
        options={{ title: "Playground" }}
      />

      <Stack.Screen
        name="Login"
        component={Screens.LoginScreen}
        options={{
          title: "로그인",
          headerRight: () => (
            <TouchableOpacity onPress={navUtils.onPress_SkipToMainWithoutLogin}>
              <Text
                style={{
                  fontSize: font.body["5"].size,
                  fontWeight: font.body["5"].weight,
                }}
              >
                건너뛰기
              </Text>
            </TouchableOpacity>
          ),
          ...commonHeaderOptions,
        }}
      />

      <Stack.Screen
        name="Main"
        component={Screens.MainScreen}
        options={{ title: "", headerShown: false }}
      />

      <Stack.Screen
        name="CreateAlarm"
        component={Screens.CreateAlarmScreen}
        options={{
          title: "알람설정",
          headerRight: () => (
            <CloseIcon onPress={navUtils.onPress_goToMain} useTouch />
          ),
          ...commonHeaderOptions,
        }}
      />

      <Stack.Screen
        name="ActivatedAlarm"
        component={Screens.ActivatedAlarmScreen}
        options={{
          title: "",
          headerShown: false,
          gestureDirection: "horizontal",
        }}
      />

      <Stack.Screen
        name="AlarmDetail"
        component={Screens.AlarmDetailScreen}
        options={{ title: "", headerShown: false }}
      />

      <Stack.Screen
        name="AddRegion"
        component={Screens.AddRegionScreen}
        options={{
          title: "지역추가",
          headerLeft: (_) => (
            <LeftArrowIcon onPress={navUtils.onPress_goBack} useTouch />
          ),
          ...commonHeaderOptions,
        }}
      />

      <Stack.Screen
        name="Settings"
        component={Screens.SettingsScreen}
        options={{
          title: "설정",
          headerLeft: (_) => (
            <LeftArrowIcon onPress={navUtils.onPress_goBack} useTouch />
          ),
          ...commonHeaderOptions,
        }}
      />

      <Stack.Screen
        name="MyInfo"
        component={Screens.MyInfoScreen}
        options={{
          title: "내 정보",
          headerLeft: (_) => (
            <LeftArrowIcon onPress={navUtils.onPress_goBack} useTouch />
          ),
          ...commonHeaderOptions,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
