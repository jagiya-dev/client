import { type PropsWithChildren } from "react";
import { Text, type TextProps, type TouchableOpacityProps } from "react-native";
import Button from "./Button";

type Props = TouchableOpacityProps & TextProps;

const TextButton = (props: PropsWithChildren<Props>) => {
  return (
    <Button {...props}>
      <Text {...props}>{props.children}</Text>
    </Button>
  );
};

export default TextButton;
