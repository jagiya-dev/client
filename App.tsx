import { Platform, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Codepush from "@/util/codepush";
import { RecoilDebugObserver } from "reactotron-recoil-plugin";
import { instance } from "./reactotron.config";

import "react-native-gesture-handler";
import {GestureHandlerRootView} from "react-native-gesture-handler";

// setup sentry
import * as Sentry from "@sentry/react-native";

console.log(`${Platform.OS}-${__DEV__ ? "dev" : "prod"}`);

if (!__DEV__) {
  console.log("Sentry enabled.");

  Sentry.init({
    dsn: "https://30091bb8ade8f405c29a52db3b1e18f8@o4505715014696960.ingest.sentry.io/4505715014762496",
    tracesSampleRate: 1.0,
  });
}

import MainScreen from "@/screen/MainScreen";
import LoginScreen from "@/screen/LoginScreen";
import { RecoilRoot } from "recoil";
import PlaygroundScreen from "@/screen/Playground";

const Stack = createNativeStackNavigator();

const App = () => {
  // run codepush first of all
  const { progress, bHasUpdate } = Codepush.useSyncOrUpdateCode();
  if (bHasUpdate) {
    return <Codepush.Panel progress={progress} />;
  }

  return (
    <GestureHandlerRootView style={s.root}>
      <RecoilRoot>
        <RecoilDebugObserver instance={instance} />
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{title: "", headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{title: "", headerShown: false}}
            />
            <Stack.Screen
              name="Playground"
              component={PlaygroundScreen}
              options={{title: "", headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
};

export default Codepush.hoc(!__DEV__ ? Sentry.wrap(App) : App);

const s = StyleSheet.create({
  root: {
    flex: 1
  },
});
