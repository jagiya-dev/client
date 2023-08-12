import type { FC } from "react";
import { View } from "react-native";
import CodepushUpdateProgress, {
  type CodepushUpdateProgressProps,
} from "./CodepushUpdateProgress";

type CodepushUpdatePanelProps = Partial<CodepushUpdateProgressProps>;

const CodepushUpdatePanel: FC<CodepushUpdatePanelProps> = ({ progress }) => {
  if (!progress) return false;

  return (
    <View>
      <CodepushUpdateProgress progress={progress} />
    </View>
  );
};

export default CodepushUpdatePanel;
