import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { PropsWithChildren } from "react";

type Props = TouchableOpacityProps;

const Button = (props: PropsWithChildren<Props>) => (
  <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
);

export default Button;
