import { DateFlag } from "@/state/date/dataFlag";

export type DateFlagT = typeof DateFlag;

export type AlarmModel = {
  id: number;
  isEnabled: boolean;
  toggleAvailability: () => void;
  enabledDates: number;
  time: string;
  dateOfTime: Uppercase<"am" | "pm">;
  weathers: ReadonlyArray<WeatherModel>;
};

export type WeatherModel = {
  weather?: "day" | "night" | "day-night";
  location?: string;
  isAddNewWeather?: boolean;
};

export type DateModel = {
  label: "월" | "화" | "수" | "목" | "금" | "토" | "일";
  isEnabled: boolean;
};

export type StackParamList = {
  Main: undefined;
  Login: undefined;
  Playground: undefined;
  KakaoLogin: {
    redirectUrl: string;
  }
};
