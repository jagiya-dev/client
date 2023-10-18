import { StyleSheet, View } from "react-native";
import Text from "@/components/Text";
import { IconFactoryByWeatherModel } from "@/components/Icon";
import Tag from "@/components/Tag";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { IsEnabled } from "@/typing";
import { cond } from "@/util/StyleHelper";
import type { AlarmLocationResponse } from "@/network/api";

type Props = AlarmLocationResponse & IsEnabled;

const AlarmLocationItem = (props: Props) => (
  <Tag
    style={cond({
      predicate: () => !props.isEnabled,
      true$: s.disabledBorder,
      underlyingStyles: s.root,
    })}
  >
    {IconFactoryByWeatherModel(
      props.timeOfDay,
      cond({
        predicate: () => !props.isEnabled,
        true$: s.disabledWeatherIcon,
      }),
    )}

    <View style={s.spacer} />

    <Text
      style={cond({
        predicate: () => !props.isEnabled,
        true$: s.disabledText,
        underlyingStyles: s.locationText,
      })}
    >
      {props.eupMyun}
    </Text>
  </Tag>
);
export default AlarmLocationItem;

const s = StyleSheet.create({
  root: {
    marginRight: 8,
    maxHeight: 32,
    paddingLeft: 8,
    paddingRight: 12,
    paddingVertical: 6,
    borderWidth: 1,
  },
  spacer: {
    marginRight: 4,
  },
  locationText: {
    color: color.sub["500"],
    fontSize: font.caption["1"].size,
    fontWeight: font.caption["1"].weight,
    lineHeight: font.caption["1"].height,
  },

  disabledWeatherIcon: {
    tintColor: color.gray["200"],
  },
  disabledText: {
    color: color.gray["200"],
  },
  disabledBorder: {
    borderColor: color.gray["100"],
  },
});
