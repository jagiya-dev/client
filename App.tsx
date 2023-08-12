import {SafeAreaView, StatusBar, Text, View} from 'react-native';

// https://learn.microsoft.com/en-us/appcenter/distribution/codepush/rn-plugin
import codePush from 'react-native-code-push';

const App = () => {
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

export default codePush(App);
