import { StyleSheet, View } from "react-native";
import { Shadow, ShadowProps } from "react-native-shadow-2";

const AddNewAlarmItemShadow = (props: ShadowProps) => {
  const rootStyle = Object.assign({}, props.style, s.root);

  return (
    <View style={rootStyle}>
      <Shadow distance={12} startColor="rgba(0, 0, 0, 0.05)" {...props} />
    </View>
  );
};

export default AddNewAlarmItemShadow;

const s = StyleSheet.create({
  root: {
    width: 62,
    height: 62,
    borderRadius: 50,
  },
});
