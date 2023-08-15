import type { FC } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Text, View } from "react-native";

import Codepush from "@/util/codepush";
import MainPage from "@/screens/Main";

const App: FC = () => {
  // run codepush first of all
  const { progress, bHasUpdate } = Codepush.useSyncOrUpdateCode();
  if (bHasUpdate) {
    return <Codepush.Panel progress={progress} />;
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <MainPage />
    </SafeAreaView>
  );
};

export default Codepush.hoc(App);

const style = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
});
