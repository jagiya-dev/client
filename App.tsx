import React from 'react';
import {StatusBar, Text, View} from 'react-native';

const App = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar barStyle="default" />
      <Text className="px-5 text-gray-400 text-2xl font-bold mt-2">
        Open up App.tsx to start working on your app!
      </Text>
    </View>
  );
};

export default App;
