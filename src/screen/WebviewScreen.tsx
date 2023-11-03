import WebView from "react-native-webview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@/typing";
import { SafeAreaView } from "react-native";

type Props = NativeStackScreenProps<StackParamList, "Webview"> & {
  header?: {
    title: string;
  };
};

const WebviewScreen = (props: Props) => {
  const { route, navigation } = props;
  const {
    params: { uri, method, html },
  } = route;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*{props.header && (*/}
      {/*  )}*/}
      <WebView source={{ uri: uri ?? "", method, html }} style={{ flex: 1 }} />
    </SafeAreaView>
  );
};
export default WebviewScreen;
