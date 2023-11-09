import {
  Image,
  type ImageProps,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { AlarmLocationResponse } from "@/network/api";
import { EDialogType } from "@/components/dialog/EDialogType";

type IconProps = Partial<Exclude<ImageProps, "source">> & {
  useTouch?: boolean;
  onPress?: TouchableOpacityProps["onPress"];
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
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/arrow_right.png")} {...props} />
  </TouchableOpacity>
);

export const LeftArrowIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/arrow_left.png")} {...props} />
  </TouchableOpacity>
);

// 추가
export const LeftArrowIcon02 = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/LeftArrow.png")} {...props} />
  </TouchableOpacity>
);

export const UserMyPageIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/userMyPageIcon.png")} {...props} />
  </TouchableOpacity>
);

export const InformationMyPageIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/informationIcon.png")} {...props} />
  </TouchableOpacity>
);

export const ShareMyPageIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/shareMyPageIcon.png")} {...props} />
  </TouchableOpacity>
);

// 추가 : 내 정보
export const KakaoIdLoginOnIcon = (props: IconProps) => (
  <Image source={require("#/icons/kakao_id_login_on=Default.png")} {...props} />
);

export const AppleIdLoginOnIcon = (props: IconProps) => (
  <Image source={require("#/icons/apple_id_login_on=Default.png")} {...props} />
);

export const KakaoIdLoginOffIcon = (props: IconProps) => (
  <Image
    source={require("#/icons/kakao_id_login_off=Default.png")}
    {...props}
  />
);

export const AppleIdLoginOffIcon = (props: IconProps) => (
  <Image
    source={require("#/icons/apple_id_login_off=Default.png")}
    {...props}
  />
);

export const DownArrowIcon = (props: IconProps & TouchableOpacityProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/arrow_down.png")} {...props} />
  </TouchableOpacity>
);

export const SettingsIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/setting.png")} {...props} />
  </TouchableOpacity>
);
export const PlusIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/plus.png")} {...props} />
  </TouchableOpacity>
);

export const MinusIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/minus.png")} {...props} />
  </TouchableOpacity>
);

export const CloseIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/close.png")} {...props} />
  </TouchableOpacity>
);

export const InfoIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
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
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/umbrella_enabled.png")} {...props} />
  </TouchableOpacity>
);
export const UmbrellaDisabledIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/umbrella_disabled.png")} {...props} />
  </TouchableOpacity>
);

export const SelectedCircle = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/selected_circle.png")} {...props} />
  </TouchableOpacity>
);

export const UnselectedCircle = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/unselected_circle.png")} {...props} />
  </TouchableOpacity>
);

export const AppleLogo = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/apple_logo.png")} {...props} />
  </TouchableOpacity>
);

export const AppleLogoEnabled = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/apple_logo_enabled.png")} {...props} />
  </TouchableOpacity>
);

export const AppleLogoDisabled = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/apple_logo_disabled.png")} {...props} />
  </TouchableOpacity>
);

export const KakaoLogoEnabled = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/kakao_logo_enabled.png")} {...props} />
  </TouchableOpacity>
);

export const KakaoLogo = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/kakao_logo.png")} {...props} />
  </TouchableOpacity>
);

export const KakaoLogoDisabled = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/kakao_logo_disabled.png")} {...props} />
  </TouchableOpacity>
);

export const MeIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/me.png")} {...props} />
  </TouchableOpacity>
);
export const ShareIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/share.png")} {...props} />
  </TouchableOpacity>
);
export const PrivacyIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/privacy.png")} {...props} />
  </TouchableOpacity>
);

export const CheckIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/check.png")} {...props} />
  </TouchableOpacity>
);

export const ExitIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/exit.png")} {...props} />
  </TouchableOpacity>
);

export const NoticeIcon = (props: IconProps) => (
  <TouchableOpacity disabled={!props.useTouch} onPress={props.onPress}>
    <Image source={require("#/icons/notice.png")} {...props} />
  </TouchableOpacity>
);

export const IconFactoryByWeatherModel = (
  weather: AlarmLocationResponse["timeOfDay"],
  style: StyleProp<ImageStyle>,
) => {
  switch (weather) {
    case "AM":
      return <DayIcon width={20} height={20} style={style} />;

    case "PM":
      return <NightIcon width={20} height={20} style={style} />;

    case "ALL":
      return <DayNightIcon width={20} height={20} style={style} />;

    default:
      return <DayNightIcon width={20} height={20} style={style} />;
  }
};

export const IconFactoryForDialog = (type: EDialogType) => {
  const sharedStyles = {
    width: 50,
    marginBottom: 16,
  };

  switch (type) {
    case "withdraw":
      return <NoticeIcon style={sharedStyles} />;
    case "withdrawComplete":
      return <CheckIcon style={sharedStyles} />;
    case "createAlarm":
      return <ExitIcon style={sharedStyles} />;
  }
};
