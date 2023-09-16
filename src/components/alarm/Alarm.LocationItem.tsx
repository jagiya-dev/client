import { StyleSheet, View } from "react-native";
import Text from "@/components/Text";
import { IconFactoryByWeatherModel, PlusIcon } from "@/components/Icon";
import Tag from "@/components/Tag";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { IsEnabled, WeatherModel } from "@/typing";
import { cond } from "@/util/StyleHelper";

type Props = WeatherModel & IsEnabled;

const AlarmLocationItem = (props: Props) => {
  if (props.isAddNewWeather) {
    return (
      <Tag
        style={cond({
          predicate: () => !props.isEnabled,
          true$: s.disabledBorder,
          underlayingStyles: s.addNewWeatherRoot
        })}
      >
        <PlusIcon
          style={cond({
            predicate: () => !props.isEnabled,
            true$: s.disabledWeatherIcon,
            underlayingStyles: s.plusIcon
          })}
        />
      </Tag>
    );
  }

  return (
    <Tag
      style={cond({
        predicate: () => !props.isEnabled,
        true$: s.disabledBorder,
        underlayingStyles: s.root
      })}
    >
      {IconFactoryByWeatherModel(
        props.weather,
        cond({
          predicate: () => !props.isEnabled,
          true$: s.disabledWeatherIcon,
          underlayingStyles: {}
        }))
      }

      <View style={s.spacer} />

      <Text
        style={cond({
          predicate: () => !props.isEnabled,
          true$: s.disabledText,
          underlayingStyles: s.locationText
        })}
      >
        {props.location}
      </Text>
    </Tag>
  );
};
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
  addNewWeatherRoot: {
    backgroundColor: color.sub["200"],
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  plusIcon: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF",
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
  }
});
