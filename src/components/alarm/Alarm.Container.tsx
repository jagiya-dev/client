import { FlatList, StyleSheet } from "react-native";
import AlarmItem from "@/components/alarm/Alarm.Item";

const DateFlag = {
  mon: 1 << 0,
  tue: 1 << 1,
  wed: 1 << 2,
  thu: 1 << 3,
  fri: 1 << 4,
  sat: 1 << 5,
  sun: 1 << 6,
};
export type DateFlagT = typeof DateFlag;

export type AlarmModel = {
  isEnabled: boolean;
  toggleAvailability: () => void;
  enabledDates: number;
  time: string;
  dateOfTime: "am" | "pm";
  weathers: ReadonlyArray<WeatherModel>;
};

export type WeatherModel = {
  weather: "sunny" | "night" | "sunny-night";
  location: string;
};

const alarmData: ReadonlyArray<AlarmModel> = [
  {
    isEnabled: true,
    toggleAvailability() {
      this.isEnabled = !this.isEnabled;
    },
    enabledDates: DateFlag.mon | DateFlag.tue | DateFlag.wed | DateFlag.sun,
    time: "0800",
    dateOfTime: "am",
    weathers: [
      {
        weather: "sunny",
        location: "신당동",
      },
      {
        weather: "night",
        location: "국구정중앙면",
      },
      {
        weather: "sunny-night",
        location: "합정동",
      },
    ],
  },
  {
    isEnabled: true,
    toggleAvailability() {
      this.isEnabled = !this.isEnabled;
    },
    enabledDates: DateFlag.mon | DateFlag.tue | DateFlag.wed | DateFlag.sun,
    time: "0800",
    dateOfTime: "am",
    weathers: [
      {
        weather: "sunny",
        location: "신당동",
      },
      {
        weather: "night",
        location: "국구정중앙면",
      },
      {
        weather: "sunny-night",
        location: "합정동",
      },
    ],
  },
  {
    isEnabled: true,
    toggleAvailability() {
      this.isEnabled = !this.isEnabled;
    },
    enabledDates: DateFlag.mon | DateFlag.tue | DateFlag.wed | DateFlag.sun,
    time: "0800",
    dateOfTime: "am",
    weathers: [
      {
        weather: "sunny",
        location: "신당동",
      },
      {
        weather: "night",
        location: "국구정중앙면",
      },
      {
        weather: "sunny-night",
        location: "합정동",
      },
    ],
  },
  {
    isEnabled: true,
    toggleAvailability() {
      this.isEnabled = !this.isEnabled;
    },
    enabledDates: DateFlag.mon | DateFlag.tue | DateFlag.wed | DateFlag.sun,
    time: "0800",
    dateOfTime: "am",
    weathers: [
      {
        weather: "sunny",
        location: "신당동",
      },
      {
        weather: "night",
        location: "국구정중앙면",
      },
      {
        weather: "sunny-night",
        location: "합정동",
      },
    ],
  },
];

const AlarmContainer = () => {
  return (
    <FlatList
      data={alarmData}
      renderItem={(data) => <AlarmItem key={data.index} {...data.item} />}
      style={s.root}
    />
  );
};
export default AlarmContainer;

const s = StyleSheet.create({
  root: {},
});
