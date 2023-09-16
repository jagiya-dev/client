import { useEffect } from "react";
import { Observable, Observer } from "rxjs";

export const useObservableEffect = <T>(
  observable: Observable<T>,
  subscribeFn: Observer<T> | ((value: T) => void),
  dependencies?: readonly any[],
) => {
  useEffect(() => {
    const dispose = observable.subscribe(subscribeFn);
    return () => dispose.unsubscribe();
  }, [observable, subscribeFn, ...(dependencies || [])]);
};
