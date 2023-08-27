import type { WeatherModel } from "@/components/alarm/Alarm.Container";
import { StyleSheet, View } from "react-native";
import Text from "@/components/Text";
import { DayIcon, NightIcon } from "@/components/Icon";
import { style } from "@/styles/style";

const IconFactory = (weather: WeatherModel["weather"]) => {
  switch (weather) {
    case "sunny":
      return <DayIcon />;

    default:
      return <NightIcon />;
  }
};

const AlarmLocationItem = (props: WeatherModel) => {
  return (
    <View style={s.root}>
      {IconFactory(props.weather)}
      <Text>{props.location}</Text>
    </View>
  );
};
export default AlarmLocationItem;

const s = StyleSheet.create({
  root: {
    flexDirection: "row",
    ...style.flex.center,
  },
});
