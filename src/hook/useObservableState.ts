import { useCallback, useState } from "react";
import { Observable, Observer } from "rxjs";
import { useFocusEffect } from "@react-navigation/native";

type UseObservableStateArgs<T> = {
  observable: Observable<T>;
  subscribeFn?: Observer<T> | ((value: T) => void);
  dependencies?: readonly any[];
};

export const useObservableState = <T>({
  observable,
  subscribeFn,
  dependencies,
}: UseObservableStateArgs<T>): ReturnType<typeof useState<T>>[0] => {
  const [state, setState] = useState<T>();

  useFocusEffect(
    useCallback(() => {
      const subscription = observable.subscribe((value) => {
        setState(value);

        if (subscribeFn && typeof subscribeFn === "function") {
          subscribeFn(value);
        }
      });

      return () => subscription?.unsubscribe();
    }, [...(dependencies ?? []), observable]),
  );

  return state;
};
