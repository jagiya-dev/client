import { type FC, useRef } from "react";
import { Dimensions, SafeAreaView, Text, View } from "react-native";
import { DownloadProgress } from "react-native-code-push";

type CodepushUpdateProgressProps = {
  progress: DownloadProgress;
};

const CodepushUpdateProgress: FC<CodepushUpdateProgressProps> = ({
  progress,
}) => {
  const deviceWidth = useRef(Dimensions.get("window").width).current;
  const widthProportion =
    (progress.receivedBytes / progress.totalBytes) * deviceWidth;

  return (
    <SafeAreaView>
      <View>
        <Text>안정적인 서비스 사용을 위해 내부 업데이트를 진행합니다.</Text>
        <Text>재시작까지 잠시만 기다려주세요.</Text>
        <View style={{ width: deviceWidth }}>
          <View style={{ width: widthProportion }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CodepushUpdateProgress;
