import { CloseIcon, LeftArrowIcon } from "@/components/Icon";
import ActivatedAlarmScreen from "@/screen/ActivatedAlarmScreen";
import AddRegionScreen from "@/screen/AddRegion/AddRegionScreen";
import AlarmDetailScreen from "@/screen/AlarmDetailScreen";
import CreateAlarmScreen from "@/screen/CreateAlarm/CreateAlarmScreen";
import LoginScreen from "@/screen/LoginScreen";
import MainScreen from "@/screen/MainScreen";
import SettingsScreen from "@/screen/SettingsScreen";
import { font } from "@/styles/font";
import { StackParamList } from "@/typing";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyInfoScreen from "@/screen/MyInfo";

const Stack = createNativeStackNavigator<StackParamList>();
const navRef = createNavigationContainerRef();

const Navigation = () => (
  <NavigationContainer ref={navRef}>
    <Stack.Navigator initialRouteName="MyInfo">
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
