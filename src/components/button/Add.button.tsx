import { type PropsWithChildren } from "react";
import { Text, TextProps, type TouchableOpacityProps } from "react-native";
import Button from "./Button";

type Props = TouchableOpacityProps & TextProps;

const AddButton = (props: PropsWithChildren<Props>) => {
  return (
    <Button {...props}>
      <Text {...props}>+</Text>
    </Button>
  );
};

export default AddButton;
