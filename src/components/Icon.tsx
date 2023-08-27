import { Image, type ImageProps } from "react-native";

type IconProps = Partial<Exclude<ImageProps, "source">>;

// day
export const DayIcon = (props: IconProps) => (
  <Image source={require("#/icons/icon-day.png")} {...props} />
);
export const DayGrayIcon = (props: IconProps) => (
  <Image source={require("#/icons/icon-day-gray.png")} {...props} />
);
export const DayNightIcon = (props: IconProps) => (
  <Image source={require("#/icons/icon-day-night.png")} {...props} />
);
export const DayNightGrayIcon = (props: IconProps) => (
  <Image source={require("#/icons/icon-day-night-gray.png")} {...props} />
);
// night
export const NightIcon = (props: IconProps) => (
  <Image source={require("#/icons/icon-night.png")} {...props} />
);
export const NightGrayIcon = (props: IconProps) => (
  <Image source={require("#/icons/icon-night-gray.png")} {...props} />
);

// symbol
export const RightArrowIcon = (props: IconProps) => (
  <Image source={require("#/icons/icon-arrow.png")} {...props} />
);
export const SettingsIcon = (props: IconProps) => (
  <Image source={require("#/icons/icon-setting.png")} {...props} />
);
export const PlusIcon = (props: IconProps) => (
  <Image source={require("#/icons/icon-plus.png")} {...props} />
);
export const MinusIcon = (props: IconProps) => (
  <Image source={require("#/icons/icon-minus.png")} {...props} />
);

// weather
export const UmbrellaEnabledIcon = (props: IconProps) => (
  <Image source={require("#/icons/icon-umbrella-enabled.png")} {...props} />
);
export const UmbrellaDisabledIcon = (props: IconProps) => (
  <Image source={require("#/icons/icon-umbrella-disabled.png")} {...props} />
);
