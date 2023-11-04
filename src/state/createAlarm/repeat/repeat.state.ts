import { BehaviorSubject, map } from "rxjs";
import { RepeatItem } from "@/typing";

const repeatItemData: readonly RepeatItem[] = [
  {
    id: "1",
    label: "월요일",
    date: 1,
    isSelected: false,
  },
  {
    id: "2",
    label: "화요일",
    date: 2,
    isSelected: false,
  },
  {
    id: "3",
    label: "수요일",
    date: 3,
    isSelected: false,
  },
  {
    id: "4",
    label: "목요일",
    date: 4,
    isSelected: false,
  },
  {
    id: "5",
    label: "금요일",
    date: 5,
    isSelected: false,
  },
  {
    id: "6",
    label: "토요일",
    date: 6,
    isSelected: false,
  },
  {
    id: "7",
    label: "일요일",
    date: 7,
    isSelected: false,
  },
];

const repeatStateSubject = new BehaviorSubject<readonly RepeatItem[]>(
  repeatItemData,
);

export const whenRepeatStateChanges = repeatStateSubject.asObservable();
export const whenOnlySelectedRepeatItems = repeatStateSubject.pipe(
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

export const whenRepeatDaysAbbreviated = whenOnlySelectedRepeatItems.pipe(
  map((items) => [...new Set(items.map((item) => item.date))]),
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

export const behaviors = {
  toggleRepeatItem,
  reset,
  isSelected,
};
