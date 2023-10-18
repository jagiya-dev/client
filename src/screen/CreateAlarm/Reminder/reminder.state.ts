import { BehaviorSubject, debounceTime, map, min, tap } from "rxjs";
import { Platform } from "react-native";

export type ReminderState = {
  pos: number;
  minute: number;
};

const selectedReminderSubject = new BehaviorSubject<ReminderState>({
  pos: 0,
  minute: 0,
});
export const whenSelectedReminderChange = selectedReminderSubject
  .asObservable()
  .pipe(
    debounceTime(700),
    map((x) => ({ ...x, pos: x.pos.toFixed(2) })),
  );

// 0 - 1 min
// 36 - 3 min
// 72 - 5 min
// 108 - 10 min
// 144 - 15 min
// 180 - 30 min
// 216 - 60 min
const setReminderState = (pos: number) => {
  let minute: number = 1;
  if (Platform.OS === "android") {
    pos += 10;
  }

  if (pos <= 36) {
    minute = 1;
  } else if (pos <= 72) {
    minute = 3;
  } else if (pos <= 108) {
    minute = 5;
  } else if (pos <= 144) {
    minute = 10;
  } else if (pos <= 180) {
    minute = 15;
  } else if (pos <= 216) {
    minute = 30;
  } else {
    minute = 60;
  }

  // console.log("pos: ", pos.toFixed(2), "min: ", minute);
  selectedReminderSubject.next({ pos, minute });
};

export const behaviours = {
  setReminderState,
};