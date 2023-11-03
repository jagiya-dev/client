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

import { LeftArrowIcon } from "@/components/Icon";
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
  headerStyle: {
    backgroundColor: "white",
  },
};

const onReady = async () => {
  await BootSplash.hide({ fade: true });
};

const Navigation = () => (
  <NavigationContainer ref={navRef} onReady={onReady}>
    <Stack.Navigator initialRouteName="Login">
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
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CreateAlarm"
        component={Screens.CreateAlarmScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ActivatedAlarm"
        component={Screens.ActivatedAlarmScreen}
        options={{
          gestureDirection: "horizontal",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AlarmDetail"
        component={Screens.AlarmDetailScreen}
        options={{ headerShown: false }}
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

      <Stack.Screen
        name="Webview"
        component={Screens.WebviewScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
