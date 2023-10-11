import Text from "@/components/Text";
import { StyleSheet, View } from "react-native";
import { font } from "@/styles/font";
import { color } from "@/styles/color";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { behaviors, whenRepeatStateChanges } from "@/state/repeat/repeat.state";
import { useObservableState } from "@/hook/useObservableState";
import RadioButtonContainer from "@/components/radioButtons/RadioButtonContainer";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import BottomButton from "@/components/fixed/BottomButton";

const RepeatContainer = () => {
  const { close } = useBottomSheet();

  const repeatItemData = useObservableState({
    observable: whenRepeatStateChanges,
  });

  if (!repeatItemData) return null;

  const onPress_saveRepeat = () => {
    close();
  };

  return (
    <View style={s.root}>
      <View style={s.titleContainer}>
        <Text style={s.title}>반복</Text>
      </View>

      <RadioButtonContainer
        data={repeatItemData}
        isSelected={behaviors.isSelected}
        onPressItem={behaviors.toggleRepeatItem}
      />

      <BottomButton onPress={onPress_saveRepeat} text="확인" />
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
});
