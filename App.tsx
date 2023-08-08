import React from 'react';
import {StatusBar, Text, View} from 'react-native';

const poo = 'bar';

const App = () => {
  return (
    <View className="items-center justify-center flex-1">
      <StatusBar barStyle="default" />
      <Text className="px-5 mt-2 text-2xl font-bold text-gray-400">
        Open up App.tsx to start working on your app!
      </Text>
    </View>
  );
};

export default App;
