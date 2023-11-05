import { useCallback } from "react";
import type { DependencyList } from "react";
import { Observable, Observer } from "rxjs";
import { useFocusEffect } from "@react-navigation/native";

type UseObservableEffectArgs<T> = {
  observable: Observable<T>;
  subscribeFn?: Observer<T> | ((value: T) => void);
  dependencies?: DependencyList;
};

export const useObservableEffect = <T>({
  observable,
  subscribeFn,
  dependencies,
}: UseObservableEffectArgs<T>): void => {
  useFocusEffect(
    useCallback(() => {
      const dispose = observable.subscribe(subscribeFn);
      return () => dispose?.unsubscribe();
    }, [observable, subscribeFn, ...(dependencies || [])]),
  );
};
