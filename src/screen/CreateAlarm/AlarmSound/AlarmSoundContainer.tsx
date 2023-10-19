import Text from "@/components/Text";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { Platform, StyleSheet, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { behaviours, whenSoundItemsChange } from "@/state/sound/sound.state";
import RadioButtonContainer from "@/components/radioButtons/RadioButtonContainer";
import { useObservableState } from "@/hook/useObservableState";
import { Button } from "@/components/button";
import { BottomSheetView, useBottomSheet } from "@gorhom/bottom-sheet";
import BottomButton from "@/components/fixed/BottomButton";
import { whenSoundVolumeChange } from "@/state/sound/soundVolume.state";

const AlarmSoundContainer = () => {
  const { close } = useBottomSheet();

  const currentSoundVolume = useObservableState({
    observable: whenSoundVolumeChange,
  });

  const soundItems = useObservableState({
    observable: whenSoundItemsChange,
  });

  if (!currentSoundVolume) return null;
  if (!soundItems) return null;

  const onPress_saveAlarmSound = () => {
    close();
  };

  return (
    <BottomSheetView style={s.root}>
      <View style={s.titleContainer}>
        <Text style={s.title}>사운드</Text>
      </View>

      <RadioButtonContainer
        data={soundItems}
        isSelected={behaviours.isSelected}
        onPressItem={(item) => behaviours.selectSound(item, currentSoundVolume)}
      />

      <BottomButton onPress={onPress_saveAlarmSound} text="확인" />
    </BottomSheetView>
  );
};
export default AlarmSoundContainer;

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

  radioGroupContainer: {
    marginTop: 4.5,
    width: widthPercentageToDP("100%"),
    flex: 1,
    paddingHorizontal: 20,
  },
  radioGroupItem: {
    width: "100%",

    alignItems: "center",

    paddingVertical: 17,

    borderBottomWidth: 1,
    borderBottomColor: color.gray["100"],
  },
  radioButtonItemText: {
    marginLeft: 24,

    color: color.gray["600"],
    fontSize: font.body["3"].size,
    fontWeight: font.body["3"].weight,
    // lineHeight: font.body["3"].height,
  },
});
