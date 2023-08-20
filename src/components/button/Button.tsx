import { ButtonProps, TouchableOpacity, Text, TextProps, TouchableOpacityProps } from "react-native";
import { PropsWithChildren } from "react";

type Props = TouchableOpacityProps & {
  textProps?: TextProps;
};

const Button = (props: PropsWithChildren<Props>) => {
  return (
    <TouchableOpacity {...props}>
      <Text {...props.textProps}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
