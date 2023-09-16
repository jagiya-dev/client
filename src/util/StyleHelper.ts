import { FlexStyle, StyleProp, ViewStyle } from "react-native";

type StyleObject<T extends FlexStyle> = Record<
  keyof StyleProp<T>,
  StyleProp<T>
>;

type SelectArgs<T extends FlexStyle> = {
  predicate: () => boolean;
  true$: StyleObject<T>;
  false$?: {};
  underlayingStyles?: StyleObject<T>;
};

export const cond = <T extends FlexStyle>({
  predicate,
  true$,
  false$,
  underlayingStyles,
}: SelectArgs<T>) => ({
  ...underlayingStyles,
  ...(predicate() ? true$ : false$),
});
