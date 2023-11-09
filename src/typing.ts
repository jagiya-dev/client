import { DateFlag } from "@/util/dateHelper";
import {
  AlarmResponse,
  AlarmWeekResponse,
  LocationResponse,
} from "@/network/api";

export type DateFlagT = typeof DateFlag;

export type LocalAuthState = {
  userId?: number;
  isLoggedIn: boolean;
  whichLoginType?: "kakao" | "apple" | "guest";
};

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
export type DateModel = {
  label: DateOfWeek;
} & IsEnabled;

export type StackParamList = {
  Main: undefined;
  Login: undefined;
  CreateAlarm: {
    alarm?: AlarmResponse;
    isEditRegion: boolean;
  };
  ActivatedAlarm: {
    alarmId: string;
  };
  AlarmDetail: {
    alarmIds: readonly number[];
  };
  AddRegion: undefined;
  Settings: undefined;
  MyInfo: {
    userId: string;
  };
  Playground: undefined;
  Webview: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    html?: string;
    uri?: string;
    headerTitle?: string;
  };
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
  thunderRainy = "thunder_rainy",
  thunderRain = "thunder_rain",
  trailRain = "trail_rain",
  underRoofRain = "under_roof_rain",
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

export type RepeatItem = ListItemsUnderLyingType &
  AlarmWeekResponse & {
    isSelected: boolean;
  };

export type SoundItem = ListItemsUnderLyingType & {
  isSelected: boolean;
};

export type ReminderIntervalItem = ListItemsUnderLyingType & {};
