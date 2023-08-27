import {
  TouchableOpacity,
  type TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { PropsWithChildren } from "react";
import { PlusIcon, RightArrowIcon } from "./Icon";
import { style } from "@/styles/style";

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

const s = StyleSheet.create({
  addButton: {
    ...style.flex.center,
  },
  withArrowButton: {
    ...style.flex.center,
  },
});
