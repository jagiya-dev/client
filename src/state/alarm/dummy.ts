import { DateFlag } from "@/state/date/dataFlag";
import type { AlarmModel } from "@/typing";

export const dummyAlarmData: ReadonlyArray<AlarmModel> = [
  {
    isEnabled: true,
    toggleAvailability() {
      this.isEnabled = !this.isEnabled;
    },
    enabledDates: DateFlag.mon | DateFlag.tue | DateFlag.wed | DateFlag.sun,
    time: "8:00",
    dateOfTime: "AM",
    weathers: [
      {
        weather: "day",
        location: "신당동",
      },
      {
        weather: "night",
        location: "국구정중앙면",
      },
      {
        weather: "day-night",
        location: "합정동",
      },
      {
        weather: "day-night",
        location: "합정동",
      },
      {
        weather: "day-night",
        location: "합정동",
      },
      {
        isAddNewWeather: true,
      },
    ],
  },
  {
    isEnabled: false,
    toggleAvailability() {
      this.isEnabled = !this.isEnabled;
    },
    enabledDates: DateFlag.mon | DateFlag.tue | DateFlag.wed | DateFlag.sun,
    time: "12:00",
    dateOfTime: "AM",
    weathers: [
      {
        weather: "day",
        location: "신당동",
      },
      {
        weather: "night",
        location: "국구정중앙면",
      },
      {
        weather: "day-night",
        location: "합정동",
      },
      {
        isAddNewWeather: true,
      },
    ],
  },
  {
    isEnabled: true,
    toggleAvailability() {
      this.isEnabled = !this.isEnabled;
    },
    enabledDates: DateFlag.mon | DateFlag.tue | DateFlag.wed | DateFlag.sun,
    time: "11:00",
    dateOfTime: "PM",
    weathers: [
      {
        weather: "day",
        location: "신당동",
      },
      {
        weather: "night",
        location: "국구정중앙면",
      },
      {
        weather: "day-night",
        location: "합정동",
      },
      {
        isAddNewWeather: true,
      },
    ],
  },
  {
    isEnabled: false,
    toggleAvailability() {
      this.isEnabled = !this.isEnabled;
    },
    enabledDates: DateFlag.mon | DateFlag.tue | DateFlag.wed | DateFlag.sun,
    time: "6:00",
    dateOfTime: "PM",
    weathers: [
      {
        weather: "day",
        location: "신당동",
      },
      {
        weather: "night",
        location: "국구정중앙면",
      },
      {
        weather: "day-night",
        location: "합정동",
      },
      {
        isAddNewWeather: true,
      },
    ],
  },
];
