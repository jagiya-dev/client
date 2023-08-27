import Reactotron from "reactotron-react-native";
import ReactotronFlipper from "reactotron-react-native/dist/flipper";
import { reactotronRecoilPlugin } from "reactotron-recoil-plugin";

export const instance = Reactotron.configure({
  name: "Ready Umbrella",
  createSocket: (path) => new ReactotronFlipper(path),
})
  .use(reactotronRecoilPlugin())
  .useReactNative()
  .connect();
