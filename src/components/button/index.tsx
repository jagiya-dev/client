import {
  TouchableOpacity,
  type TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { PropsWithChildren } from "react";
import { PlusIcon, RightArrowIcon } from "../Icon";
import { style } from "@/styles/style";
import Text from "@/components/Text";
import { color } from "@/styles/color";

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
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={dateTextButtenStyle.baseText}
    >
      <Text
        style={props.isEnabled
          ? dateTextButtenStyle.enabledText
          : dateTextButtenStyle.disabledText}
      >
        {props.label}
      </Text>
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
  baseText: {
    marginRight: 4,
  },
  enabledText: {
    color: color.sub["400"],
  },
  disabledText: {
    color: color.gray["200"],
  },
});
