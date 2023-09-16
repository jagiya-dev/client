import { BehaviorSubject } from "rxjs";

export const deleteModeToggleSubject = new BehaviorSubject<boolean>(false);

export const whenToggleDeleteMode = deleteModeToggleSubject
  .asObservable()
  .pipe();
