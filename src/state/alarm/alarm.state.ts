import { AlarmModel } from "@/typing";
import { atom } from "recoil";
import { AllDateFlag, DateFlag } from "../date/dataFlag";
import { faker } from "@faker-js/faker";

let uorder = 0;
function getUOrder(): number {
  return uorder++;
}

export function genAlarmItem(): AlarmModel {
  return {
    id: getUOrder(),
    isEnabled: faker.datatype.boolean(),
    toggleAvailability() {
      this.isEnabled = !this.isEnabled;
    },
    enabledDates: faker.helpers.arrayElement([AllDateFlag]),
    time: "8:00",
    dateOfTime: faker.helpers.arrayElement(["AM", "PM"]),
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
  };
}

export const alarmModel = atom<ReadonlyArray<AlarmModel>>({
  key: "alarmState",
  default: [
    {
      id: getUOrder(),
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
      id: getUOrder(),
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
      id: getUOrder(),
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
      id: getUOrder(),
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
