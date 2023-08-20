import { Text as RNText, TextProps } from 'react-native'

type Props = TextProps & {};

const Text = (args: Props) => {
  return (<RNText style={{ fontFamily: "Pretendard" }} {...args} />);
}

export default Text;