import { Text as RNText, type TextProps } from "react-native";

type Props = TextProps & {};

const Text = (props: Props) => {
  const style = Object.assign({}, props.style, { fontFamily: "Pretendard" });
  return <RNText {...props} style={style} />;
};

export default Text;
