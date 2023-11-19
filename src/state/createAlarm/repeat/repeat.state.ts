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

const weekdayComparer = [1, 2, 3, 4, 5];
const weekendComparer = [6, 7];
const everyDayComparer = [1, 2, 3, 4, 5, 6, 7];
const dayLabelAsString = (input: number) => {
  switch (input) {
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
    default:
      return "일";
  }
};
const getRepeatDaysAbbreviated = (label: readonly number[]) => {
  const isOneOfWeekday = weekdayComparer.some((day) => label.includes(day));
  const isOneOfWeekend = weekendComparer.some((day) => label.includes(day));

  if (isOneOfWeekday && !isOneOfWeekend) return "주중";
  if (!isOneOfWeekday && isOneOfWeekend) return "주말";

  const isEveryday = everyDayComparer.every((day) => label.includes(day));
  if (isEveryday) {
    return "매일";
  }

  if (isOneOfWeekday && isOneOfWeekend) {
    const combined = label.map(dayLabelAsString).join(", ");
    return combined + " 요일";
  }
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
