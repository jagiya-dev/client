import { DateFlag } from "@/state/date/dataFlag";

export type DateFlagT = typeof DateFlag;

export type IsEnabled = {
  isEnabled: boolean;
};

export type AlarmModel = {
  id: number;
  enabledDates: number;
  time: string;
  dateOfTime: Uppercase<"am" | "pm">;
  weathers: ReadonlyArray<WeatherModel>;
} & IsEnabled;

export type WeatherModel = {
  weather?: "day" | "night" | "day-night";
  location?: string;
  isAddNewWeather?: boolean;
};

export type DateModel = {
  label: "월" | "화" | "수" | "목" | "금" | "토" | "일";
} & IsEnabled;

export type StackParamList = {
  Main: undefined;
  Login: undefined;
  Playground: undefined;
  KakaoLogin: {
    redirectUrl: string;
  };
  Alarm: undefined;
  ActivatedAlarm: undefined;
};
