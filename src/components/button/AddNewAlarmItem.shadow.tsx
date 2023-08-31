import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { Button } from ".";
import { Shadow, ShadowProps } from "react-native-shadow-2";

type Props = {
  onPress?: (e: GestureResponderEvent) => void;
} & ShadowProps;

const AddNewAlarmItemShadow = (props: Props) => (
  <View style={props.style}>
    <Shadow distance={12} startColor="rgba(0, 0, 0, 0.05)">
      <Button style={s.button} />
    </Shadow>
  </View>
);

export default AddNewAlarmItemShadow;

const s = StyleSheet.create({
  button: {
    width: 62,
    height: 62,
    borderRadius: 50,
  },
});
