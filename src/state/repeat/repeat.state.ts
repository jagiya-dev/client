import { BehaviorSubject, filter } from "rxjs";
import { RepeatItem } from "@/typing";

const repeatItemData: readonly RepeatItem[] = [
  {
    id: "0",
    label: "월요일",
    isSelected: false,
  },
  {
    id: "1",
    label: "화요일",
    isSelected: false,
  },
  {
    id: "2",
    label: "수요일",
    isSelected: false,
  },
  {
    id: "3",
    label: "목요일",
    isSelected: false,
  },
  {
    id: "4",
    label: "금요일",
    isSelected: false,
  },
  {
    id: "5",
    label: "토요일",
    isSelected: false,
  },
  {
    id: "6",
    label: "일요일",
    isSelected: false,
  },
];

const repeatStateSubject = new BehaviorSubject<readonly RepeatItem[]>(
  repeatItemData,
);

export const whenRepeatStateChanges = repeatStateSubject.asObservable();
export const onlySelectedRepeatItems$ = repeatStateSubject.pipe(
  filter((items) => items.some((item) => item.isSelected)),
);

const toggleRepeatItem = (id: string) => {
  const { value } = repeatStateSubject;
  if (!value) return value;

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
  isSelected,
};
