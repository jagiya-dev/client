import { TextInputProps, TextInput as RNTextInput } from "react-native";

interface Props extends TextInputProps {}

const TextInput = (props: Props) => {
  return <RNTextInput {...props} />;
};

export default TextInput;
