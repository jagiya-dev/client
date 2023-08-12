import {SafeAreaView, StatusBar, Text, View} from 'react-native';

// https://learn.microsoft.com/en-us/appcenter/distribution/codepush/rn-plugin
import codePush, {CodePushOptions} from 'react-native-code-push';

const codePushOptions: CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
};

const App = () => {

  const 
  return (
    <SafeAreaView>
      <StatusBar />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Welcome!</Text>
      </View>
    </SafeAreaView>
  );
};

export default codePush(codePushOptions)(App);
