import type { FC } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Codepush from "@/util/codepush";
import MainScreen from "@/screens/Main";
import LoginScreen from "@/screens/Login";

const Stack = createNativeStackNavigator();

const App: FC = () => {
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
  );
};


export default App;