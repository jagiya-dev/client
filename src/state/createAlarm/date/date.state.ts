import { BehaviorSubject } from "rxjs";

const selectedAlarmDate = new BehaviorSubject<Date>(new Date());
export const selectedAlarmDate$ = selectedAlarmDate.asObservable();

const selectAlarmDate = (date: Date) => {
  selectedAlarmDate.next(date);
};
export const behaviours = {
  selectAlarmDate,
};
