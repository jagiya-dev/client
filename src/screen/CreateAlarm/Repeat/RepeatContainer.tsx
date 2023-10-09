import Text from "@/components/Text";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { font } from "@/styles/font";
import { color } from "@/styles/color";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { behaviors, whenRepeatStateChanges } from "@/state/repeat/repeat.state";
import { useObservableState } from "@/hook/useObservableState";

const RepeatContainer = () => {
  const repeatItemData = useObservableState({
    observable: whenRepeatStateChanges,
  });

  if (!repeatItemData) return null;
  console.log("repeatItemData: ", repeatItemData);

  return (
    <View style={s.root}>
      <View style={s.titleContainer}>
        <Text style={s.title}>반복</Text>
      </View>

      <ScrollView
        contentContainerStyle={s.repeatItemContainer}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
      >
        {repeatItemData.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => behaviors.toggleRepeatItem(item.id)}
          >
            {/* radio button circle */}
            <View style={s.repeatItem}>
              <View
                style={[
                  s.repeatItemRadioButton,
                  behaviors.isSelected(item.id)
                    ? s.repeatItemRadioButtonActivated
                    : {},
                ]}
              />

              <Text style={s.repeatItemText}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default RepeatContainer;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: widthPercentageToDP("100%"),
  },

  titleContainer: {
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: font.button["1"].size,
    fontWeight: font.button["1"].weight,
    lineHeight: font.button["1"].height,
    color: color.gray["10"],
  },

  repeatItemContainer: {
    marginTop: 4.5,
    width: widthPercentageToDP("100%"),
    flex: 1,
    paddingHorizontal: 20,
  },
  repeatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,

    borderBottomWidth: 1,
    borderBottomColor: color.gray["100"],
  },
  repeatItemText: {
    marginLeft: 24,

    color: color.gray["600"],
    fontSize: font.body["3"].size,
    fontWeight: font.body["3"].weight,
    lineHeight: font.body["3"].height,
  },
  repeatItemRadioButton: {
    width: 28,
    height: 28,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: color.gray["200"],
  },
  repeatItemRadioButtonActivated: {
    backgroundColor: color.primary["600"],
    borderWidth: 2,
    borderColor: color.primary["600"],
  },
});
