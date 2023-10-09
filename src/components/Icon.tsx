import {
  Image,
  type ImageProps,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ImageStyle,
} from "react-native";
import { WeatherModel } from "@/typing";

type IconProps = Partial<Exclude<ImageProps, "source">> & {
  useTouch?: boolean;
};

// day
export const DayIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} style={props.style}>
    <Image source={require("#/icons/day.png")} {...props} />
  </TouchableOpacity>
);
export const DayGrayIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} style={props.style}>
    <Image source={require("#/icons/day_gray.png")} {...props} />
  </TouchableOpacity>
);
export const DayNightIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} style={props.style}>
    <Image source={require("#/icons/day_night.png")} {...props} />
  </TouchableOpacity>
);
export const DayNightGrayIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} style={props.style}>
    <Image source={require("#/icons/day_night_gray.png")} {...props} />
  </TouchableOpacity>
);
// night
export const NightIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} style={props.style}>
    <Image source={require("#/icons/night.png")} {...props} />
  </TouchableOpacity>
);
export const NightGrayIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} style={props.style}>
    <Image source={require("#/icons/night_gray.png")} {...props} />
  </TouchableOpacity>
);

// symbol
export const RightArrowIcon = (props: IconProps & TouchableOpacityProps) => (
  <TouchableOpacity disabled={!props.useTouch} {...props}>
    <Image source={require("#/icons/arrow_right.png")} {...props} />
  </TouchableOpacity>
);

export const LeftArrowIcon = (props: IconProps & TouchableOpacityProps) => (
  <TouchableOpacity disabled={!props.useTouch} {...props}>
    <Image source={require("#/icons/arrow_left.png")} {...props} />
  </TouchableOpacity>
);

export const DownArrowIcon = (props: IconProps & TouchableOpacityProps) => (
  <TouchableOpacity disabled={!props.useTouch} {...props}>
    <Image source={require("#/icons/arrow_down.png")} {...props} />
  </TouchableOpacity>
);

export const SettingsIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} {...props}>
    <Image source={require("#/icons/setting.png")} {...props} />
  </TouchableOpacity>
);
export const PlusIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} style={props.style} {...props}>
    <Image source={require("#/icons/plus.png")} {...props} />
  </TouchableOpacity>
);

export const MinusIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} {...props}>
    <Image source={require("#/icons/minus.png")} {...props} />
  </TouchableOpacity>
);

export const CloseIcon = (props: IconProps & TouchableOpacityProps) => (
  <TouchableOpacity disabled={!props.useTouch} {...props}>
    <Image source={require("#/icons/close.png")} {...props} />
  </TouchableOpacity>
);

export const InfoIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/info.png")} {...props} />
  </TouchableOpacity>
);

export const MapIcon = (props: IconProps) => (
  <Image source={require("#/icons/map.png")} {...props} />
);

export const BellIcon = (props: IconProps) => (
  <Image source={require("#/icons/bell.png")} {...props} />
);

export const SearchIcon = (props: IconProps) => (
  <Image source={require("#/icons/search.png")} {...props} />
);

export const SoundVolumeIcon = (props: IconProps) => (
  <Image source={require("#/icons/volume_on.png")} {...props} />
);

export const VibrationIcon = (props: IconProps) => (
  <Image source={require("#/icons/vibration.png")} {...props} />
);

export const TimeIcon = (props: IconProps) => (
  <Image source={require("#/icons/time.png")} {...props} />
);

// weather
export const UmbrellaEnabledIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/umbrella_enabled.png")} {...props} />
  </TouchableOpacity>
);
export const UmbrellaDisabledIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/umbrella_disabled.png")} {...props} />
  </TouchableOpacity>
);

export const SelectedCircle = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/selected_circle.png")} {...props} />
  </TouchableOpacity>
);

export const UnselectedCircle = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/unselected_circle.png")} {...props} />
  </TouchableOpacity>
);

export const IconFactoryByWeatherModel = (
  weather: WeatherModel["weather"],
  style: StyleProp<ImageStyle>,
) => {
  switch (weather) {
    case "day":
      return <DayIcon width={20} height={20} style={style} />;

    case "night":
      return <NightIcon width={20} height={20} style={style} />;

    case "day-night":
      return <DayNightIcon width={20} height={20} style={style} />;

    default:
      return <DayNightIcon width={20} height={20} style={style} />;
  }
};
