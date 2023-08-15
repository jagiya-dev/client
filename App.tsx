import type { FC } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Codepush from "@/util/codepush";
import MainPage from "@/screens/Main";
import React from "react";

const Stack = createNativeStackNavigator();

const App: FC = () => {
  // run codepush first of all
  const { progress, bHasUpdate } = Codepush.useSyncOrUpdateCode();
  if (bHasUpdate) {
    return <Codepush.Panel progress={progress} />;
  }

  return (
    <NavigationContainer>
      <SafeAreaView>
        <StatusBar />
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainPage} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Codepush.hoc(App);