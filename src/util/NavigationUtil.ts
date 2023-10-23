import DeviceInfo from "react-native-device-info";
import { local } from "@/state/auth/auth.state.local";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { font } from "@/styles/font";
import { navRef } from "@/navigation/navigation";

const onPress_SkipToMainWithoutLogin = async () => {
  try {
    const deviceId = await DeviceInfo.getUniqueId();
    console.log("skip to main without login. deviceId: ", deviceId);

    local.login("guest");
    await local.update();

    navRef.navigate("Main");
  } catch (error) {
    console.error("error: ", error);
  }
};

const onPress_goBack = () => {
  if (navRef.canGoBack()) {
    navRef.goBack();
  }
};

const onPress_goToMain = () => {
  navRef.navigate("Main");
};

export default {
  onPress_SkipToMainWithoutLogin,
  onPress_goBack,
  onPress_goToMain,
};
