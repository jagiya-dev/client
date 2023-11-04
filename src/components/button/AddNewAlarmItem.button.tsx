import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { color } from "@/styles/color";
import { Shadow } from "react-native-shadow-2";

type Props = {
  onPress?: (e: GestureResponderEvent) => void;
} & TouchableOpacityProps;

const AddNewAlarmItemButton = (props: Props) => (
  <Shadow
    // distance={14}
    offset={[4, 4]}
    startColor="rgba(0, 0, 0, 0.1)"
    stretch
    containerStyle={[props.style, { flex: 1, zIndex: 10, overflow: "visible" }]}
  >
    <TouchableOpacity style={s.button} onPress={props.onPress}>
      <Image source={require("#/icons/plus.png")} style={s.plusIcon} />
    </TouchableOpacity>
  </Shadow>
);

export default AddNewAlarmItemButton;

const s = StyleSheet.create({
  button: {
    width: 62,
    height: 62,
    borderRadius: 50,
    backgroundColor: color.primary["600"],
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    tintColor: "white",
  },
});
