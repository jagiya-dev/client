// https://learn.microsoft.com/en-us/appcenter/distribution/codepush/rn-plugin

import type { FC } from "react";
import type { DownloadProgress, CodePushOptions } from "react-native-code-push";

import { useRef } from "react";
import { useSyncOrUpdateCode } from "./useSyncOrUpdateCode";

import codePush from "react-native-code-push";

import { Dimensions, Text, View } from "react-native";

//#region setup hoc
const codepushOptions: CodePushOptions = {
  // 수동 워크플로우 설정하려고 Manual.
  checkFrequency: codePush.CheckFrequency.MANUAL,
};

const codepushSetupHoc = (rootFunctionalComponent: FC) => {
  return codePush(codepushOptions)(rootFunctionalComponent);
};
//#endregion setup hoc

//#region progress
type CodepushUpdateProgressProps = { progress: DownloadProgress };
const CodepushUpdateProgress: FC<CodepushUpdateProgressProps> = ({
  progress,
}) => {
  const deviceWidth = useRef(Dimensions.get("window").width).current;
  const widthProportion =
    (progress.receivedBytes / progress.totalBytes) * deviceWidth;

  return (
    <>
      <Text>안정적인 서비스 사용을 위해 내부 업데이트를 진행합니다.</Text>
      <Text>재시작까지 잠시만 기다려주세요.</Text>
      <View style={{ width: deviceWidth }}>
        <View style={{ width: widthProportion }} />
      </View>
    </>
  );
};
//#endregion progress

//#region update panel
type CodepushUpdatePanelProps = Partial<CodepushUpdateProgressProps>;
const CodepushUpdatePanel: FC<CodepushUpdatePanelProps> = ({ progress }) => {
  if (!progress) return false;

  return <CodepushUpdateProgress progress={progress} />;
};
//#endregion update panel

const Codepush = {
  hoc: codepushSetupHoc,
  useSyncOrUpdateCode,
  Panel: CodepushUpdatePanel,
};

export default Codepush;
