import { useCallback } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { LocalAuthState } from "@/typing";
import { Platform } from "react-native";
import { local } from "@/state/auth/auth.state.local";

export const useQuestHasLoginHistory = (
  afterQuery?: () => void,
  onFail?: () => void,
) => {
  const { setItem, getItem } = useAsyncStorage("localAuthState");

  useFocusEffect(
    useCallback(() => {
      let alreadyDone = false;
      const queryHasLoginHistory = async () => {
        try {
          const jsonValue = await getItem();
          if (!jsonValue || jsonValue === "{}") {
            onFail?.();
            return;
          }

          const localHistory: LocalAuthState = JSON.parse(jsonValue);
          if (!localHistory) {
            return;
          }

          console.log(
            `[${Platform.OS}] already has login history`,
            localHistory,
          );

          if (alreadyDone) return;
          local.hydrate(localHistory);

          afterQuery?.();
        } catch (err) {
          console.error(err);
        }
      };

      const timer = setTimeout(() => {
        queryHasLoginHistory();
      }, 1000);

      return () => {
        alreadyDone = true;
        clearTimeout(timer);
      };
    }, [setItem, getItem]),
  );

  return {
    getItem,
    setItem,
  };
};
