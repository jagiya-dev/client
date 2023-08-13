import { ColorSchemeName } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const getBackgroundColor = (colorScheme: ColorSchemeName) =>
  colorScheme === "dark" ? Colors.darker : Colors.lighter;
