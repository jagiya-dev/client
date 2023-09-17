import Tag from "@/components/Tag";
import Text from "@/components/Text";
import { StyleSheet } from "react-native";
import { color } from "@/styles/color";
import { WeatherModel } from "@/typing";
import { cond } from "@/util/StyleHelper";
import { font } from "@/styles/font";

type Props = {
  isSelected: boolean;
} & Pick<WeatherModel, "location">;
const LocationItem = (props: Props) => {
  return (
    <Tag
      style={cond({
        predicate: () => props.isSelected,
        true$: s.selected,
        underlyingStyles: s.root
      })}
    >
      <Text style={s.text}>
        {props.location}
      </Text>
    </Tag>
  );

};
export default LocationItem;

const s = StyleSheet.create({
  root: {
    borderColor: color.sub["200"],
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  selected: {
    backgroundColor: color.sub["200"],
    color: "white"
  },
  text: {
    color: color.sub["500"],
    fontSize: font.title["2"].size,
    fontWeight: font.title["2"].weight,
    lineHeight: font.title["2"].height,

  }
});
