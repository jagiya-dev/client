import { type PropsWithChildren } from "react";
import { Image, ImageProps, type TouchableOpacityProps } from "react-native";
import Button from "./Button";

type Props = TouchableOpacityProps & ImageProps;

const TextButton = (props: PropsWithChildren<Props>) => {
  return (
    <Button {...props}>
      <Image {...props} />
    </Button>
  );
};

export default TextButton;
