import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Button } from ".";
import { PlusIcon } from "../Icon";
import { color } from "@/styles/color";
import { Shadow } from "react-native-shadow-2";

type Props = {
  onPress?: (e: GestureResponderEvent) => void;
} & TouchableOpacityProps;

const AddNewAlarmItembutton = (props: Props) => (
  <View style={[props.style, { zIndex: 10 }]}>
    <Shadow distance={16} offset={[6, 6]} startColor="rgba(0, 0, 0, 0.1)">
      <Button style={s.button} onPress={props.onPress}>
        <PlusIcon style={s.plusIcon} />
      </Button>
    </Shadow>
  </View>
);

export default AddNewAlarmItembutton;

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
