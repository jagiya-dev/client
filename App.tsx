import type { FC } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

// https://learn.microsoft.com/en-us/appcenter/distribution/codepush/rn-plugin
import codePush, { type CodePushOptions } from "react-native-code-push";
import { useTrySync } from "./src/util/codepush/useTrySync";
import CodepushUpdatePanel from "./src/util/codepush/CodepushUpdatePanel";

const codePushOptions: CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
};

const App: FC = () => {
  const { progress, bHasUpdate } = useTrySync();
  if (bHasUpdate) {
    return <CodepushUpdatePanel progress={progress} />;
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Welcome!</Text>
      </View>
    </SafeAreaView>
  );
};

export default codePush(codePushOptions)(App);
