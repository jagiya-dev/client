import type { ReminderIntervalItem } from "@/typing";

export const reminderItemsIOS: readonly ReminderIntervalItem[] = [
  ...new Array(4).fill(0).map((_, i) => ({ id: i.toString(), label: "" })),
  {
    id: "4",
    label: "1분",
  },
  {
    id: "5",
    label: "3분",
  },
  {
    id: "6",
    label: "5분",
  },
  {
    id: "7",
    label: "10분",
  },
  {
    id: "8",
    label: "15분",
  },
  {
    id: "9",
    label: "30분",
  },
  {
    id: "10",
    label: "60분",
  }, // 6
  ...new Array(6)
    .fill(0)
    .map((_, i) => ({ id: (i + 11).toString(), label: "" })),
];

export const reminderItemsAndroid: readonly ReminderIntervalItem[] = [
  ...new Array(4).fill(0).map((_, i) => ({ id: i.toString(), label: "" })),
  {
    id: "4",
    label: "1분",
  },
  {
    id: "5",
    label: "3분",
  },
  {
    id: "6",
    label: "5분",
  },
  {
    id: "7",
    label: "10분",
  },
  {
    id: "8",
    label: "15분",
  },
  {
    id: "9",
    label: "30분",
  },
  {
    id: "10",
    label: "60분",
  }, // 6
  ...new Array(8)
    .fill(0)
    .map((_, i) => ({ id: (i + 11).toString(), label: "" })),
];
