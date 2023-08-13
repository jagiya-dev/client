import type { PropsWithChildren } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { getBackgroundColor } from "styles/helper";

type SectionProps = {
  title: string;
} & PropsWithChildren;

const App = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = getBackgroundColor(colorScheme);

  return (
    <SafeAreaView style={backgroundColor}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor }}
      >
        <View
          style={{
            backgroundColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Welcome!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
