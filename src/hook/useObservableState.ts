import { useEffect, useState } from "react";
import { Observable, Observer } from "rxjs";

export const useObservableState = <T>(
  observable: Observable<T>,
  subscribeFn: Observer<T> | ((value: T) => void),
  dependencies?: readonly any[],
) => {
  const [state, setState] = useState<T>();

  useEffect(() => {
    const subscription = observable.subscribe(subscribeFn);
    return () => subscription?.unsubscribe();
  }, [observable, subscribeFn, ...(dependencies || [])]);

  return [state, setState];
};
