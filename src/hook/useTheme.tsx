import { type ColorSchemeName, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const backgroundColor: ColorSchemeName = isDarkMode
    ? Colors.darker
    : Colors.lighter;

  return {
    isDarkMode,
    backgroundColor,
  };
};
