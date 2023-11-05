import { useEffect, useState } from "react";
import type { DownloadProgress } from "react-native-code-push";
import codePush from "react-native-code-push";

// https://ingg.dev/codepush/
// https://zerogyun.dev/2021/07/15/React-Native-버그픽스-3분완성-코드푸시-맛-2/
export const useSyncOrUpdateCode = () => {
  const [bHasUpdate, setHasUpdate] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress>();

  const hasUpdateCompleted = () => {
    return downloadProgress?.receivedBytes === downloadProgress?.totalBytes;
  };

  useEffect(() => {
    const checkAndUpdateCode = async () => {
      try {
        const remotePkg = await codePush.checkForUpdate();
        const bHasUpdate = remotePkg !== null;
        setHasUpdate(bHasUpdate);

        if (!bHasUpdate) return;

        const downloadedLocalPkg = await remotePkg.download(
          (progress: DownloadProgress) => {
            setDownloadProgress(progress);
          },
        );

        try {
          await downloadedLocalPkg.install(codePush.InstallMode.IMMEDIATE);
        } catch (err) {
          // todo: download 실패시 처리..
        }

        codePush.restartApp();
      } catch (err) {
        // todo: codepush update 동작 실패시 처리..
        // codePush.restartApp();
      } finally {
        //
        setHasUpdate(false);
      }
    };

    checkAndUpdateCode();
  }, []);

  return {
    progress: downloadProgress,
    bHasUpdate,
    hasUpdateCompleted,
  };
};
