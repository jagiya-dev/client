import { useEffect } from "react";
import { LocalAuthState } from "@/typing";
import { Platform } from "react-native";
import { local } from "@/state/auth/auth.state.local";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { CallbackWithResult } from "@react-native-async-storage/async-storage/lib/typescript/types";

const defaultErrorHandler: CallbackWithResult<string> = (err, result) =>
  console.error(err, result);
export const useQuestHasLoginHistory = (
  afterQuery?: () => void,
  errorHandler: CallbackWithResult<string> = defaultErrorHandler,
) => {
  const { getItem } = useAsyncStorage("localAuthState");

  useEffect(() => {
    const queryHasLoginHistory = async () => {
      try {
        const jsonValue = await getItem(errorHandler);
        if (!jsonValue) return;

        const localHistory: LocalAuthState = JSON.parse(jsonValue);
        if (!localHistory) return;

        console.log(`[${Platform.OS}] already has login history`, localHistory);

        local.hydrate(localHistory);

        afterQuery?.();
      } catch (err) {
        console.error(err);
      }
    };

    queryHasLoginHistory();
  }, [getItem]);
};
