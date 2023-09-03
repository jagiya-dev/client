import { AlarmModel } from "@/typing";
import { atom } from "recoil";
import { DateFlag } from "../date/dataFlag";

export const alarmState = atom<ReadonlyArray<AlarmModel>>({
  key: "alarmState",
  default: [
    {
      id: 0,
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
      id: 1,
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
      id: 2,
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
      id: 3,
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
  ],
});
