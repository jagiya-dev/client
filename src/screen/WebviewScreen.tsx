import WebView from "react-native-webview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@/typing";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "@/components/Text";
import { font } from "@/styles/font";
import { color } from "@/styles/color";

type Props = NativeStackScreenProps<StackParamList, "Webview">;

const WebviewScreen = (props: Props) => {
  const { route, navigation } = props;
  const {
    params: { uri, method, html, headerTitle },
  } = route;

  const onPressButton_goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={s.root}>
      <View style={s.header}>
        <Text style={s.headerTitle}>{headerTitle}</Text>

        <TouchableOpacity
          onPress={onPressButton_goBack}
          style={s.headerCloseIconButton}
        >
          <Image
            source={require("#/icons/close.png")}
            style={s.headerCloseIcon}
          />
        </TouchableOpacity>
      </View>

      <WebView
        style={s.webviewRoot}
        source={{ uri: uri ?? "", method, html }}
      />
    </SafeAreaView>
  );
};
export default WebviewScreen;

const s = StyleSheet.create({
  root: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: color.gray["50"],
    position: "relative",
  },
  header: {
    position: "relative",

    height: 70,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    lineHeight: font.body["1"].height,
  },
  headerCloseIconButton: {
    width: 30,
    height: 30,
    zIndex: 10,
    position: "absolute",
    top: 20,
    bottom: 0,
    right: 20,
  },
  headerCloseIcon: {
    width: 30,
    height: 30,
  },

  webviewRoot: {},
});
