import { StyleSheet, View } from "react-native";
import { Shadow, ShadowProps } from "react-native-shadow-2";

const AddNewAlarmItemShadow = (props: ShadowProps) => (
  <View style={[props.style, s.root]}>
    <Shadow distance={12} startColor="rgba(0, 0, 0, 0.25)" {...props} />
  </View>
);

export default AddNewAlarmItemShadow;

const s = StyleSheet.create({
  root: {
    width: 62,
    height: 62,
    borderRadius: 50,
  },
});
