import Reactotron from "reactotron-react-native";
import {reactotronRecoilPlugin} from "reactotron-recoil-plugin";

export const instance = Reactotron.configure({
    name: "Ready Umbrella",
})
    .use(reactotronRecoilPlugin())
    .useReactNative()
    .connect();
