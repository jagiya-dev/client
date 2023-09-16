import { useEffect, useState } from "react";
import type { DependencyList } from "react";
import { Observable, Observer } from "rxjs";

type UseObservableStateArgs<T> = {
  observable: Observable<T>;
  subscribeFn?: Observer<T> | ((value: T) => void);
  dependencies?: DependencyList;
};

export const useObservableState = <T>(
  args: UseObservableStateArgs<T>,
): ReturnType<typeof useState<T>> => {
  const { observable, subscribeFn, dependencies } = args;
  const [state, setState] = useState<T>();

  useEffect(() => {
    const subscription = observable.subscribe((value) => {
      setState(value);
      if (subscribeFn && typeof subscribeFn === "function") {
        subscribeFn(value);
      }
    });
    return () => subscription?.unsubscribe();
  }, [observable, subscribeFn, ...(dependencies || [])]);

  return [state, setState];
};
