import {
  map,
  skipUntil,
  Subject, takeWhile,
  tap,
  timer
} from "rxjs";

const initialTime = 5 * 60 * 1000; // 30000
const asTimeStr = (ms: number) => {
  const noMs = ms / 1000;
  const m = Math.floor(noMs / 60);
  const s = (noMs) - (m * 60);

  return `${m.toString()}:${s.toFixed(0).padStart(2, "0")}`;
};
export const initialTimeAsStr = asTimeStr(initialTime);
let fromTime = initialTime; // 30000


const alarmDeferSubject$ = new Subject<void>();
export const alarmDeferCountdown$ = timer(0, 1000)
  .pipe(
    skipUntil(alarmDeferSubject$),
    takeWhile(() => fromTime > -1),
    map(_ => {
      const noMs = fromTime / 1000;
      const m = Math.floor(noMs / 60);
      const s = (noMs) - (m * 60);

      const timeStr = `${m.toString()}:${s.toFixed(0).padStart(2, "0")}`;
      fromTime -= 1000;

      return timeStr;
    }),
    tap(_ => {
      if (fromTime > -1) return;

      console.log("countdown finished");
      alarmDeferSubject$.complete();
    })
  );
export const startCountdown = () => {
  alarmDeferSubject$.next();
  fromTime = initialTime;
};
