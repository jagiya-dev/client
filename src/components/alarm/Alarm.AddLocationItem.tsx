import { PlusIcon } from "@/components/Icon";
import Tag from "@/components/Tag";
import { cond } from "@/util/StyleHelper";
import { IsEnabled } from "@/typing";
import { StyleSheet } from "react-native";
import { color } from "@/styles/color";

type Props = IsEnabled;

const AlarmAddLocationItem = (props: Props) => (
  <Tag
    style={cond({
      predicate: () => !props.isEnabled,
      true$: s.disabledBG,
      underlyingStyles: s.addNewWeatherRoot,
    })}
  >
    <PlusIcon style={s.plusIcon} />
  </Tag>
);
export default AlarmAddLocationItem;
const s = StyleSheet.create({
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

  disabledBG: {
    backgroundColor: color.gray["200"],
  },
});
