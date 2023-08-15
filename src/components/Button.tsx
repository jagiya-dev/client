import { ButtonProps, Button as RNButton } from "react-native";

interface Props extends ButtonProps {}

export const Button = (props: Props) => {
  return <RNButton {...props} />;
};
