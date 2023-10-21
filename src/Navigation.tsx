import { StackParamList } from "@/typing";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivatedAlarmScreen from "@/screen/ActivatedAlarmScreen";
import AddRegionScreen from "@/screen/AddRegion/AddRegionScreen";
import AlarmDetailScreen from "@/screen/AlarmDetailScreen";
import CreateAlarmScreen from "@/screen/CreateAlarm/CreateAlarmScreen";
import LoginScreen from "@/screen/LoginScreen";
import MainScreen from "@/screen/MainScreen";
import SettingsScreen from "@/screen/SettingsScreen";
import MyInfoScreen from "@/screen/MyInfo";

import { font } from "@/styles/font";
import Text from "@/components/Text";

import { TouchableOpacity } from "react-native";
import DeviceInfo from "react-native-device-info";
import BootSplash from "react-native-bootsplash";
import { local } from "@/state/auth/auth.state.local";

import { CloseIcon, LeftArrowIcon } from "@/components/Icon";

const Stack = createNativeStackNavigator<StackParamList>();
const navRef = createNavigationContainerRef();

const onPress_SkipToMainWithoutLogin = async () => {
  try {
    const deviceId = await DeviceInfo.getUniqueId();
    console.log("skip to main without login. deviceId: ", deviceId);

    local.login("guest");
    await local.update();

    navRef.navigate("Main");
  } catch (error) {
    console.error("error: ", error);
  }
};

const Navigation = () => (
  <NavigationContainer
    ref={navRef}
    onReady={() => {
      BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    }}
  >
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "로그인",
          headerRight: () => (
            <TouchableOpacity onPress={onPress_SkipToMainWithoutLogin}>
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
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: font.body["1"].size,
            fontWeight: font.body["1"].weight,
            fontFamily: "Pretendard",
          },
        }}
      />
      <Stack.Screen
        name="CreateAlarm"
        component={CreateAlarmScreen}
        options={{
          title: "알람설정",
          headerRight: () => (
            <CloseIcon onPress={() => navRef.navigate("Main")} useTouch />
          ),
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: font.body["1"].size,
            fontWeight: font.body["1"].weight,
            fontFamily: "Pretendard",
          },
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
          headerLeft: (props) => (
            <LeftArrowIcon
              onPress={() => {
                if (props.canGoBack) {
                  navRef.goBack();
                }
              }}
              useTouch
            />
          ),
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: font.body["1"].size,
            fontWeight: font.body["1"].weight,
            fontFamily: "Pretendard",
          },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "설정",
          headerLeft: (props) => (
            <LeftArrowIcon
              onPress={() => {
                if (props.canGoBack) {
                  navRef.goBack();
                }
              }}
              useTouch
            />
          ),
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: font.body["1"].size,
            fontWeight: font.body["1"].weight,
            fontFamily: "Pretendard",
          },
        }}
      />
      <Stack.Screen
        name="MyInfo"
        component={MyInfoScreen}
        options={{
          title: "내 정보",
          headerLeft: (props) => (
            <LeftArrowIcon
              onPress={() => {
                if (props.canGoBack) {
                  navRef.goBack();
                }
              }}
              useTouch
            />
          ),
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: font.body["1"].size,
            fontWeight: font.body["1"].weight,
            fontFamily: "Pretendard",
          },
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;