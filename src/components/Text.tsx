import { Text as RNText, type TextProps } from "react-native";

const Text = (props: TextProps) => {
  const style = [props.style, { fontFamily: "Pretendard" }];
  return <RNText {...props} style={style} />;
};

export default Text;
