import { StyleSheet } from "react-native";
import Text from "@/components/Text";
import { IconFactoryByWeatherModel, PlusIcon } from "@/components/Icon";
import Tag from "@/components/Tag";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { WeatherModel } from "@/typing";

const AlarmLocationItem = (props: WeatherModel) => {
  if (props.isAddNewWeather) {
    return (
      <Tag style={s.addNewWeatherRoot}>
        <PlusIcon style={s.plusIcon} />
      </Tag>
    );
  }

  return (
    <Tag style={s.root}>
      {IconFactoryByWeatherModel(props.weather)}
      <Text style={s.locationText}>{props.location}</Text>
    </Tag>
  );
};
export default AlarmLocationItem;

const s = StyleSheet.create({
  root: {
    marginRight: 4,
    maxHeight: 32,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
  },
  addNewWeatherRoot: {
    backgroundColor: color.sub["400"],
    maxHeight: 32,
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
    color: color.sub["400"],
    fontSize: font.caption["2"].size,
    fontWeight: font.caption["2"].weight,
    lineHeight: font.caption["2"].height,
  },
});
