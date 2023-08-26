import { Image, type ImageProps } from "react-native";
import { type IconData, registry } from "./data";

const Icon = (props: ImageProps) => <Image {...props} />;
const IconFactory = ({ load, ...rest }: IconData) => (
  <Icon source={load()} {...rest} />
);

export type IconProps = ImageProps;

// day
export const DayIcon = () => <IconFactory {...registry.day} />;
export const DayGrayIcon = () => <IconFactory {...registry.dayGray} />;
export const DayNightIcon = () => <IconFactory {...registry.dayNight} />;
export const DayNightGrayIcon = () => (
  <IconFactory {...registry.dayNightGray} />
);

// night
export const NightIcon = () => <IconFactory {...registry.night} />;
export const NightGrayIcon = () => <IconFactory {...registry.nightGray} />;

// symbol
export const RightArrowIcon = () => <IconFactory {...registry.rightArrow} />;
export const SettingsIcon = () => <IconFactory {...registry.settings} />;
export const PlusIcon = () => <IconFactory {...registry.plus} />;
export const MinusIcon = () => <IconFactory {...registry.minus} />;

// weather
export const UmbrellaEnabledIcon = () => (
  <IconFactory {...registry.umbrellaEnabled} />
);
export const UmbrellaDisabledIcon = () => (
  <IconFactory {...registry.umbrellaDisabled} />
);
