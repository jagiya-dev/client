import type { FC } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Text, View } from "react-native";

import Codepush from "./src/util/codepush";

const App: FC = () => {
  const { progress, bHasUpdate } = Codepush.useSyncOrUpdateCode();
  if (bHasUpdate) {
    return <Codepush.Panel progress={progress} />;
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={style.root}>
        <Text>Welcome!</Text>
      </View>
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
