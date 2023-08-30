import {
  TouchableOpacity,
  type TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { PropsWithChildren } from "react";
import { PlusIcon, RightArrowIcon } from "./Icon";
import { style } from "@/styles/style";
import Text from "@/components/Text";
import { color } from "@/styles/color";
import { DateModel } from "@/components/alarm/Alarm.Item";

type Props = TouchableOpacityProps;

export const Button = (props: PropsWithChildren<Props>) => (
  <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
);

// const ButtonFactory = (props: Props) => <Button {...props} />;

export const AddButton = (props: PropsWithChildren<Props>) => (
  <Button {...props} style={s.addButton}>
    <PlusIcon />
  </Button>
);

export const CircleMenuButton = (props: PropsWithChildren<Props>) => (
  <AddButton {...props} />
);

export const WithArrowButton = (props: PropsWithChildren<Props>) => (
  <Button {...props} style={s.withArrowButton}>
    <RightArrowIcon />
  </Button>
);

type DateTextButtonProps = {
  label: string;
  isEnabled?: boolean;
  onPress: () => void;
};
export const DateTextButton = (props: DateTextButtonProps) => {
  const innerTextStyle = props.isEnabled
    ? dateTextButtenStyle.enabledText
    : dateTextButtenStyle.disabledText;

  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={innerTextStyle}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  addButton: {
    ...style.flex.center,
  },
  withArrowButton: {
    ...style.flex.center,
  },
});

const dateTextButtenStyle = StyleSheet.create({
  enabledText: {
    color: color.primary["500"],
  },
  disabledText: {
    color: color.gray["500"],
  },
});
