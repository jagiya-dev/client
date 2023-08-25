import {
  TouchableOpacity,
  Text,
  type TextProps,
  type TouchableOpacityProps,
} from "react-native";
import { PropsWithChildren } from "react";

type Props = TouchableOpacityProps & TextProps;

const Button = (props: PropsWithChildren<Props>) => (
  <TouchableOpacity {...props}>
    <Text {...props}>{props.children}</Text>
  </TouchableOpacity>
);

export default Button;
