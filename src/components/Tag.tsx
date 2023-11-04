import type { PropsWithChildren } from "react";
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  View,
  ViewProps,
} from "react-native";
import { color } from "@/styles/color";

type Props = ViewProps & TouchableNativeFeedbackProps;

const Tag = (props: PropsWithChildren<Props>) => (
  <TouchableNativeFeedback {...props}>
    <View {...props} style={[s.root, props.style]}>
      {props.children}
    </View>
  </TouchableNativeFeedback>
);
export default Tag;

const s = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 32,
    borderColor: color.sub["500"],
  },
});
