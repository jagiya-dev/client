import type { PropsWithChildren } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { color } from "@/styles/color";

const Tag = (props: PropsWithChildren<ViewProps>) => {
  const style = Object.assign({}, s.root, props.style);
  return (
    <View {...props} style={style}>
      {props.children}
    </View>
  );
};
export default Tag;

const s = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 32,
    borderColor: color.sub["400"],
  },
});
