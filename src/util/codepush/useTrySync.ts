import { useEffect, useState } from "react";
import { DownloadProgress } from "react-native-code-push";
import codePush from "react-native-code-push";

// https://ingg.dev/codepush/
// https://zerogyun.dev/2021/07/15/React-Native-버그픽스-3분완성-코드푸시-맛-2/

export const useTrySync = () => {
  const [bHasUpdate, setHasUpdate] = useState(false);
  const [progress, setProgress] = useState<DownloadProgress>();
  const hasUpdateCompleted = () =>
    progress?.receivedBytes === progress?.totalBytes;

  useEffect(() => {
    const checkAndUpdateCodepush = async () => {
      try {
        const remotePkg = await codePush.checkForUpdate();
        const bHasUpdate = remotePkg !== null;
        setHasUpdate(bHasUpdate);
        if (!bHasUpdate) return;

        const downloadedLocalPkg = await remotePkg.download(
          (progress: DownloadProgress) => {
            setProgress(progress);
          },
        );

        await downloadedLocalPkg.install(codePush.InstallMode.IMMEDIATE);

        codePush.restartApp();
      } catch (err) {
        // todo: codepush update 동작 실패시 처리..
        // codePush.restartApp();
      } finally {
        //
        setHasUpdate(false);
      }
    };

    checkAndUpdateCodepush();
  }, []);

  return {
    progress,
    bHasUpdate,
    hasUpdateCompleted,
  };
};
