import { Image, type ImageProps, TouchableOpacity } from "react-native";
import { WeatherModel } from "@/typing";

type IconProps = Partial<Exclude<ImageProps, "source">> & {
  useTouch?: boolean;
};

// day
export const DayIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/icon-day.png")} {...props} />
  </TouchableOpacity>
);
export const DayGrayIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/icon-day-gray.png")} {...props} />
  </TouchableOpacity>
);
export const DayNightIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/icon-day-night.png")} {...props} />
  </TouchableOpacity>
);
export const DayNightGrayIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/icon-day-night-gray.png")} {...props} />
  </TouchableOpacity>
);
// night
export const NightIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/icon-night.png")} {...props} />
  </TouchableOpacity>
);
export const NightGrayIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/icon-night-gray.png")} {...props} />
  </TouchableOpacity>
);

// symbol
export const RightArrowIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/icon-arrow.png")} {...props} />
  </TouchableOpacity>
);
export const SettingsIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/icon-setting.png")} {...props} />
  </TouchableOpacity>
);
export const PlusIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/icon-plus.png")} {...props} />
  </TouchableOpacity>
);
export const MinusIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/icon-minus.png")} {...props} />
  </TouchableOpacity>
);

// weather
export const UmbrellaEnabledIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/icon-umbrella-enabled.png")} {...props} />
  </TouchableOpacity>
);
export const UmbrellaDisabledIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/icon-umbrella-disabled.png")} {...props} />
  </TouchableOpacity>
);

export const IconFactoryByWeatherModel = (weather: WeatherModel["weather"]) => {
  switch (weather) {
    case "day":
      return <DayIcon width={20} height={20} />;

    case "night":
      return <NightIcon width={20} height={20} />;

    case "day-night":
      return <DayNightIcon width={20} height={20} />;

    default:
      return <DayNightIcon width={20} height={20} />;
  }
};