import { useTheme } from "hooks/useTheme";
import type { PropsWithChildren } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";

type SectionProps = {
  title: string;
} & PropsWithChildren;

const App = () => {
  const { backgroundColor, isDarkMode } = useTheme();

  return (
    <SafeAreaView style={backgroundColor}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
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
