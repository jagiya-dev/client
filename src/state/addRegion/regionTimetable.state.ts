import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
} from "rxjs";
import { amItems, pmItems } from "@/state/addRegion/regionTimetable.data";
import { ETimeTableItemState } from "@/typing";

const amTimetableSubject = new BehaviorSubject(amItems);
export const amTimetable$ = amTimetableSubject.asObservable();
const amTimeAllSelected$ = amTimetableSubject.pipe(
  map((items) =>
    items.filter((item) => item.state === ETimeTableItemState.selected),
  ),
);

const pmTimetableSubject = new BehaviorSubject(pmItems);
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

const updateTimeTableStateOfAMFromTime = (
  time: string,
  newState: ETimeTableItemState,
) => {
  const { value } = amTimetableSubject;
  const index = value.findIndex((item) => item.time === time);
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

const updateTimeTableStateOfPMFromTime = (
  time: string,
  newState: ETimeTableItemState,
) => {
  const { value } = pmTimetableSubject;
  const index = value.findIndex((item) => item.time === time);
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
  updateTimeTableStateOfAMFromTime,
  updateTimeTableStateOfPM,
  toggleTimeTableStateOfPM,
  updateTimeTableStateOfPMFromTime,
  reset,
};
