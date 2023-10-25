import { DateModel } from "@/typing";

export const DateFlag = {
  mon: 1 << 0,
  tue: 1 << 1,
  wed: 1 << 2,
  thu: 1 << 3,
  fri: 1 << 4,
  sat: 1 << 5,
  sun: 1 << 6,
};

export const AllDateFlag =
  DateFlag.mon |
  DateFlag.tue |
  DateFlag.wed |
  DateFlag.thu |
  DateFlag.fri |
  DateFlag.sat |
  DateFlag.sun;
export const LenDateFlags = 7;

export const dummyDates: ReadonlyArray<DateModel> = [
  { label: "월", isEnabled: true },
  { label: "화", isEnabled: false },
  { label: "수", isEnabled: true },
  { label: "목", isEnabled: false },
  { label: "금", isEnabled: true },
  { label: "토", isEnabled: false },
  { label: "일", isEnabled: true },
];
