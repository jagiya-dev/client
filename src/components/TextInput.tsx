import { TextInputProps, TextInput as RNTextInput } from "react-native";

interface Props extends TextInputProps {}

export const TextInput = (props: Props) => {
  return <RNTextInput {...props} />;
};
