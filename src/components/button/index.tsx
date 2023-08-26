import {
  TouchableOpacity,
  Text,
  type TextProps,
  type TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { PropsWithChildren } from "react";
import { PlusIcon, RightArrowIcon } from "../icon";
import { global as $ } from "@/styles/global";

type Props = TouchableOpacityProps;

const Button = (props: PropsWithChildren<Props>) => (
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

export const TextButton = (props: PropsWithChildren<Props & TextProps>) => (
  <Button {...props} style={s.withArrowButton}>
    <Text {...props}>{props.children}</Text>
  </Button>
);

const s = StyleSheet.create({
  addButton: {
    ...$.flex.center,
  },
  withArrowButton: {
    ...$.flex.center,
  },
});

export default Button;
