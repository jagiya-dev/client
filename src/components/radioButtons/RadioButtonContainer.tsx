import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "@/components/Text";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { font } from "@/styles/font";
import { color } from "@/styles/color";
import { ListItemsUnderLyingType } from "@/typing";
import { SelectedCircle, UnselectedCircle } from "@/components/Icon";

type Props<T extends ListItemsUnderLyingType> = {
  data: readonly T[];
  isSelected: (id: string) => boolean;
  onPressItem?: (id: string) => void;
  isHorizontal?: boolean;
};

const RadioButtonContainer = <T extends ListItemsUnderLyingType>(
  props: Props<T>,
) => (
  <ScrollView
    contentContainerStyle={s.container}
    {...{
      horizontal: props.isHorizontal,
      showsHorizontalScrollIndicator: props.isHorizontal,
    }}
  >
    {props.data.map((item: T) => (
      <TouchableOpacity
        key={item.id}
        onPress={() => props.onPressItem?.(item.id)}
      >
        {/* radio button circle */}
        <View style={s.item}>
          {props.isSelected(item.id) ? (
            <SelectedCircle />
          ) : (
            <UnselectedCircle />
          )}

          {!!item.label && <Text style={s.itemText}>{item.label}</Text>}
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
);
export default RadioButtonContainer;

const s = StyleSheet.create({
  container: {
    marginTop: 4.5,
    width: widthPercentageToDP("100%"),
    flex: 1,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,

    borderBottomWidth: 1,
    borderBottomColor: color.gray["100"],
  },
  itemText: {
    marginLeft: 24,

    color: color.gray["600"],
    fontSize: font.body["3"].size,
    fontWeight: font.body["3"].weight,
    lineHeight: font.body["3"].height,
  },
  radioButton: {
    width: 28,
    height: 28,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: color.gray["200"],
  },
  radioButtonSelected: {
    backgroundColor: color.primary["600"],
    borderWidth: 2,
    borderColor: color.primary["600"],
  },
});
