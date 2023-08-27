import { StyleSheet, View } from "react-native";
import Text from "@/components/Text";
import { IconFactoryByWeatherModel, PlusIcon } from "@/components/Icon";
import Tag from "@/components/Tag";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { WeatherModel } from "@/typing";

const AlarmLocationItem = (props: WeatherModel) => {
  if (props.isAddNewWeather) {
    return (
      <Tag style={{ ...s.root, ...s.addNewWeatherBorder }}>
        <PlusIcon />
      </Tag>
    );
  }

  return (
    <Tag style={s.root}>
      {IconFactoryByWeatherModel(props.weather)}
      <View />
      <Text style={s.locationText}>{props.location}</Text>
    </Tag>
  );
};
export default AlarmLocationItem;

const s = StyleSheet.create({
  root: {
    marginRight: 4,
    height: 32,
  },
  addNewWeatherBorder: {
    borderColor: color.primary["600"],
  },
  spacer: {
    marginRight: 4,
  },
  locationText: {
    color: color.primary["500"],
    fontSize: font.caption["2"].size,
    fontWeight: font.caption["2"].weight,
    lineHeight: font.caption["2"].height,
  },
});
