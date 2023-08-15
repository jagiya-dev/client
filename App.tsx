import type { FC } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Text, View } from "react-native";

import Codepush from "./src/util/codepush";

const App: FC = () => {
  // run codepush first of all
  const { progress, bHasUpdate } = Codepush.useSyncOrUpdateCode();
  if (bHasUpdate) {
    return <Codepush.Panel progress={progress} />;
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={style.root}>
        <Text>Welcome!</Text>
        <Text>And This text is updated with codepush!</Text>
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
