import { useEffect, type FC } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { FC } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Text, View } from "react-native";

import Codepush from "@/util/codepush";
import MainScreen from "@/screens/Main";
import LoginScreen from "@/screens/Login";

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
    <NavigationContainer>
      {/* <StatusBar /> */}
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Main" component={MainScreen} options={{ title: "" }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "로그인" }} />
      </Stack.Navigator>
    </NavigationContainer>
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
    <SafeAreaView>
      <StatusBar />
      <View style={style.root}>
        <Text>Welcome!</Text>
        <Text>And This text is updated with codepush!</Text>
      </View>
    </SafeAreaView>
  );
};


export default Codepush.hoc(Sentry.wrap(App));
  root: {
    flex: 1
    justifyContent: "center",
    alignItems: "center",
  },
});
