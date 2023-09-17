import { Image, type ImageProps, TouchableOpacity, TouchableOpacityProps, StyleProp, ImageStyle } from "react-native";
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
export const RightArrowIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/arrow.png")} {...props} />
  </TouchableOpacity>
);
export const SettingsIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/setting.png")} {...props} />
  </TouchableOpacity>
);
export const PlusIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} style={props.style}>
    <Image source={require("#/icons/plus.png")} {...props} />
  </TouchableOpacity>
);
export const MinusIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/minus.png")} {...props} />
  </TouchableOpacity>
);
export const CloseIcon = (props: IconProps & TouchableOpacityProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/close.png")} {...props} />
  </TouchableOpacity>
);
export const InfoIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch}>
    <Image source={require("#/icons/info.png")} {...props} />
  </TouchableOpacity>
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

export const IconFactoryByWeatherModel = (weather: WeatherModel["weather"], style: StyleProp<ImageStyle>) => {
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
