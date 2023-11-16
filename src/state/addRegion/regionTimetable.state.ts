import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
} from "rxjs";
import { amItems, pmItems } from "@/state/addRegion/regionTimetable.data";
import { ETimeTableItemState, TimetableItem } from "@/typing";
import { getAlarmLocationTimeList } from "@/network/api";

const amTimetableSubject = new BehaviorSubject<readonly TimetableItem[]>(
  amItems,
);
export const amTimetable$ = amTimetableSubject.asObservable();
const amTimeAllSelected$ = amTimetableSubject.pipe(
  map((items) =>
    items.filter((item) => item.state === ETimeTableItemState.selected),
  ),
);

const pmTimetableSubject = new BehaviorSubject<readonly TimetableItem[]>(
  pmItems,
);
export const pmTimetable$ = pmTimetableSubject.asObservable();
const pmTimeAllSelected$ = pmTimetableSubject.pipe(
  map((items) =>
    items.filter((item) => item.state === ETimeTableItemState.selected),
  ),
);

export const allTimeSelected$ = combineLatest([
  amTimeAllSelected$,
  pmTimeAllSelected$,
]).pipe(
  distinctUntilChanged(),
  map(([amTimetables, pmTimetables]) => [...amTimetables, ...pmTimetables]),
);

export const briefSelectedTimesAsFormattedString$ = allTimeSelected$.pipe(
  map((allSelectedTimes) => {
    if (allSelectedTimes === undefined || allSelectedTimes.length === 0)
      return "시간 선택";

    const cnt = allSelectedTimes.length - 1;
    if (cnt === 0) return allSelectedTimes?.[0].time;

    return `${allSelectedTimes?.[0].time} 외 ${cnt}건`;
  }),
);

const populate = async (fromTime: string) => {
  try {
    const response = await getAlarmLocationTimeList({
      alarmTime: fromTime,
    });

    const data = response?.data;
    if (!data) return;

    // console.log(`populate region timetable ${data.map((x) => x.locationTime)}`);

    // make comparable times
    const amTimes = [];
    const pmTimes = [];

    for (const { locationTime } of response.data!) {
      if (!locationTime || locationTime === "") {
        continue;
      }

      const comparableLocationTime = locationTime.padStart(4, "0");
      const comparableLocationTimeAsNumber = +comparableLocationTime;

      const isAm = comparableLocationTimeAsNumber <= 1100;
      if (isAm) {
        amTimes.push(comparableLocationTimeAsNumber);
      } else {
        pmTimes.push(comparableLocationTimeAsNumber);
      }
    }

    // mark am items
    const comparableAMItems = amItems.map(
      (item) => +item.time.replace(":", ""),
    );

    for (const amTime of amTimes) {
      const found = comparableAMItems.findIndex((x) => x === amTime);
      if (found !== -1) {
        updateTimeTableStateOfAM(found, ETimeTableItemState.none);
      }
    }

    // mark pm items
    const comparablePMItems = pmItems.map(
      (item) => +item.time.replace(":", ""),
    );

    for (const pmTime of pmTimes) {
      const found = comparablePMItems.findIndex((x) => x === pmTime);
      if (found !== -1) {
        updateTimeTableStateOfPM(found, ETimeTableItemState.none);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

const reset = () => {
  const { value: amValue } = amTimetableSubject;
  amTimetableSubject.next(
    amValue.map((value) => ({
      ...value,
      state:
        value.state !== ETimeTableItemState.disabled
          ? ETimeTableItemState.none
          : ETimeTableItemState.disabled,
    })),
  );

  const { value: pmValue } = pmTimetableSubject;
  pmTimetableSubject.next(
    pmValue.map((value) => ({
      ...value,
      state:
        value.state !== ETimeTableItemState.disabled
          ? ETimeTableItemState.none
          : ETimeTableItemState.disabled,
    })),
  );
};

const updateTimeTableStateOfAM = (
  index: number,
  newState: ETimeTableItemState,
) => {
  const { value } = amTimetableSubject;

  amTimetableSubject.next([
    ...value.slice(0, index),
    { ...value[index], state: newState },
    ...value.slice(index + 1),
  ]);
};

const updateTimeTableStateOfAMFromTimeStr = (
  time: string,
  newState: ETimeTableItemState,
) => {
  const { value } = amTimetableSubject;
  const index = value.findIndex((item) => item.time === time);
  updateTimeTableStateOfAM(index, newState);
};

const updateTimeTableStateOfAMFromTime = (
  time: string,
  newState: ETimeTableItemState,
) => {
  const { value } = amTimetableSubject;
  const index = value
    .map((x) => x.time.replace(":", ""))
    .findIndex((t) => t === time);

  updateTimeTableStateOfAM(index, newState);
};

const toggleTimeTableStateOfAM = (index: number) => {
  const { value } = amTimetableSubject;
  const currentState = value[index].state;

  updateTimeTableStateOfAM(
    index,
    currentState === ETimeTableItemState.none
      ? ETimeTableItemState.selected
      : ETimeTableItemState.none,
  );
};

const updateTimeTableStateOfPM = (
  index: number,
  newState: ETimeTableItemState,
) => {
  const { value } = pmTimetableSubject;

  pmTimetableSubject.next([
    ...value.slice(0, index),
    { ...value[index], state: newState },
    ...value.slice(index + 1),
  ]);
};

const updateTimeTableStateOfPMFromTimeStr = (
  time: string,
  newState: ETimeTableItemState,
) => {
  const { value } = pmTimetableSubject;
  const index = value.findIndex((item) => item.time === time);
  updateTimeTableStateOfPM(index, newState);
};

const updateTimeTableStateOfPMFromTime = (
  time: string,
  newState: ETimeTableItemState,
) => {
  const { value } = pmTimetableSubject;
  const index = value
    .map((x) => x.time.replace(":", ""))
    .findIndex((t) => t === time);

  updateTimeTableStateOfPM(index, newState);
};

const toggleTimeTableStateOfPM = (index: number) => {
  const { value } = pmTimetableSubject;
  const currentState = value[index].state;

  updateTimeTableStateOfPM(
    index,
    currentState === ETimeTableItemState.none
      ? ETimeTableItemState.selected
      : ETimeTableItemState.none,
  );
};

export const behaviours = {
  updateTimeTableStateOfAM,
  toggleTimeTableStateOfAM,
  updateTimeTableStateOfAMFromTimeStr,

  updateTimeTableStateOfPM,
  toggleTimeTableStateOfPM,
  updateTimeTableStateOfPMFromTimeStr,

  populate,
  reset,
};
