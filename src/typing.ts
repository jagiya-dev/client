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
  bHasIcon?: boolean;
  location?: string;
  isAddNewWeather?: boolean;
};

export type DateOfWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";
export type SelectedDateOfWeek = readonly DateOfWeek[];
export type DateModel = {
  label: DateOfWeek;
} & IsEnabled;

export type StackParamList = {
  Main: undefined;
  Login: undefined;
  Playground: undefined;
  KakaoLogin: {
    redirectUrl: string;
  };
  CreateAlarm: undefined;
  ActivatedAlarm: undefined;
  AlarmDetail: undefined;
  AddRegion: undefined;
  Settings: undefined;
  MyInfo: undefined;
};

export type AlarmDate = {
  date: Date;
};

export type AlarmRepeat = {
  repeatDate: Date;
  repeatTime: number;
};

export type SoundSelect = {
  soundVolume: number;
  soundName: ESoundName;
};

export enum ESoundName {
  emergency = "emergency",
  gravelRain = "gravel_rain",
  pedestrianRain = "pedestrian_rain",
  tableClock = "table_clock",
  tamacRain = "tamac_rain",
  thunderRain2 = "thunder_rain2",
  thunderRain = "thunder_rain",
  trailRain = "trail_rain",
  underRoofRain = "underRoof_rain",
  valleyRain = "valley_rain",
}

export enum ETimeTableItemState {
  none,
  selected,
  disabled,
}

export type TimetableItem = {
  time: string;
  state: ETimeTableItemState;
  isAM: boolean;
};

export type ListItemsUnderLyingType = {
  id: string;
  label?: string;
};

export type RepeatItem = ListItemsUnderLyingType & {
  date: number;
  isSelected: boolean;
};

export type SoundItem = ListItemsUnderLyingType & {
  isSelected: boolean;
};

export type ReminderIntervalItem = ListItemsUnderLyingType & {};
