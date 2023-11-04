import { BehaviorSubject, map } from "rxjs";
import { RepeatItem } from "@/typing";
import { AlarmWeekResponse } from "@/network/api";
import { weekDaysLabel } from "@/state/const";

const repeatItemInitialData: () => readonly RepeatItem[] = () =>
  new Array(7).fill(0).map((_, i) => ({
    id: `${i + 1}`,
    label: weekDaysLabel[i],
    weekId: i + 1,
    isSelected: false,
  }));

const repeatStateSubject = new BehaviorSubject<readonly RepeatItem[]>(
  repeatItemInitialData(),
);

export const repeatState$ = repeatStateSubject.asObservable();
export const onlySelectedRepeatItems$ = repeatStateSubject.pipe(
  map((items) => items.filter((item) => item.isSelected)),
);

const getRepeatDaysAbbreviated = (label: readonly number[]) => {
  const weekdays =
    label.includes(1) ||
    label.includes(2) ||
    label.includes(3) ||
    label.includes(4) ||
    label.includes(5);

  const weekend = label.includes(6) || label.includes(7);

  if (weekdays && !weekend) return "주중";
  if (!weekdays && weekend) return "주말";

  if (
    label.includes(1) &&
    label.includes(2) &&
    label.includes(3) &&
    label.includes(4) &&
    label.includes(5) &&
    label.includes(6) &&
    label.includes(7)
  )
    return "매일";

  if (weekdays && weekend) return "주중+주말";
};

export const repeatDaysAbbr$ = onlySelectedRepeatItems$.pipe(
  map((items) => [...new Set(items.map((item) => item.weekId as number))]),
  map(getRepeatDaysAbbreviated),
);

const reset = () => {
  const { value } = repeatStateSubject;
  if (!value) return;

  repeatStateSubject.next(
    value.map((item) => ({ ...item, isSelected: false })),
  );
};

const toggleRepeatItem = (id: string): void => {
  const { value } = repeatStateSubject;
  if (!value) return;

  const newRepeatItems = value.map((item) =>
    item.id === id
      ? {
          ...item,
          isSelected: !item.isSelected,
        }
      : item,
  );

  repeatStateSubject.next(newRepeatItems);
};

const isSelected = (id: string) => {
  const { value } = repeatStateSubject;
  if (!value) return false;

  const foundItem = value.find((item) => item.id === id);
  if (!foundItem) return false;

  return foundItem.isSelected;
};

const setRepeat = (alarmWeekResponses: AlarmWeekResponse[]) => {
  repeatStateSubject.next(
    new Array(7).fill(0).map((_, i) => ({
      id: `${i + 1}`,
      weekId: i + 1,
      isSelected: alarmWeekResponses.some((item) => item.weekId === i + 1),
      label: weekDaysLabel[i],
    })),
  );
};

export const behaviors = {
  toggleRepeatItem,
  reset,
  isSelected,
  setRepeat,
};
