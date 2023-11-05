import Tag from "@/components/Tag";
import Text from "@/components/Text";
import { StyleSheet } from "react-native";
import { color } from "@/styles/color";
import { cond } from "@/util/StyleHelper";
import { font } from "@/styles/font";
import { AlarmLocationDetailResponse } from "@/network/api";

type Props = {
  selectLocation: () => void;
  isSelected: boolean;
} & Pick<AlarmLocationDetailResponse, "eupMyun">;

const LocationItem = (props: Props) => (
  <Tag
    style={cond({
      predicate: () => props.isSelected,
      true$: s.selected,
      false$: s.disabled,
      underlyingStyles: s.root,
    })}
    onPress={props.selectLocation}
  >
    <Text
      style={cond({
        predicate: () => props.isSelected,
        true$: s.selectedText,
        false$: s.disabledText,
        underlyingStyles: s.text,
      })}
    >
      {props.eupMyun}
    </Text>
  </Tag>
);

export default LocationItem;

const s = StyleSheet.create({
  root: {
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  selected: {
    backgroundColor: color.sub["500"],
    borderColor: color.sub["500"],
  },
  disabled: {
    backgroundColor: "white",
    borderColor: color.gray["100"],
  },

  text: {
    fontSize: font.body["2"].size,
    fontWeight: font.body["2"].weight,
    lineHeight: font.body["2"].height,
  },
  selectedText: {
    color: "white",
  },
  disabledText: {
    color: color.gray["300"],
  },
});
