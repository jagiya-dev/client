import { ETimeTableItemState, TimetableItem } from "@/typing";

export const amItems: readonly TimetableItem[] = [
  {
    time: "12:00",
    state: ETimeTableItemState.disabled,
  },
  {
    time: "01:00",
    state: ETimeTableItemState.disabled,
  },
  {
    time: "02:00",
    state: ETimeTableItemState.disabled,
  },
  {
    time: "03:00",
    state: ETimeTableItemState.disabled,
  },
  {
    time: "04:00",
    state: ETimeTableItemState.disabled,
  },
  {
    time: "05:00",
    state: ETimeTableItemState.selected,
  },
  {
    time: "06:00",
    state: ETimeTableItemState.selected,
  },
  {
    time: "07:00",
    state: ETimeTableItemState.none,
  },
  {
    time: "08:00",
    state: ETimeTableItemState.none,
  },
  {
    time: "09:00",
    state: ETimeTableItemState.none,
  },
  {
    time: "10:00",
    state: ETimeTableItemState.none,
  },
  {
    time: "11:00",
    state: ETimeTableItemState.none,
  },
];

export const pmItems: readonly TimetableItem[] = [
  {
    time: "12:00",
    state: ETimeTableItemState.disabled,
  },
  {
    time: "13:00",
    state: ETimeTableItemState.disabled,
  },
  {
    time: "14:00",
    state: ETimeTableItemState.disabled,
  },
  {
    time: "15:00",
    state: ETimeTableItemState.disabled,
  },
  {
    time: "16:00",
    state: ETimeTableItemState.disabled,
  },
  {
    time: "17:00",
    state: ETimeTableItemState.disabled,
  },
  {
    time: "18:00",
    state: ETimeTableItemState.disabled,
  },
  {
    time: "19:00",
    state: ETimeTableItemState.selected,
  },
  {
    time: "20:00",
    state: ETimeTableItemState.selected,
  },
  {
    time: "21:00",
    state: ETimeTableItemState.none,
  },
  {
    time: "22:00",
    state: ETimeTableItemState.none,
  },
  {
    time: "23:00",
    state: ETimeTableItemState.none,
  },
];
