import { ESoundName, soundNameAsLabel, sounds } from "@/audio";
import Text from "@/components/Text";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import RadioButtonsGroup, {
  type RadioButtonProps,
} from "react-native-radio-buttons-group";
import { widthPercentageToDP } from "react-native-responsive-screen";

const AlarmSoundContainer = () => {
  const [selectedId, setSelectedId] = useState<string>("");

  const radioButtons: RadioButtonProps[] = useMemo(
    () =>
      Object.values(ESoundName).map((soundName: ESoundName, i) => ({
        id: soundName,
        label: soundNameAsLabel(soundName),
        value: soundName,

        borderColor: color.gray["200"],
        borderSize: 2.5,
        size: 28,

        labelStyle: s.radioButtonItemText,
        containerStyle: s.radioGroupItem,
      })),
    [s],
  );

  const onPress_Sound = (soundId: string) => {
    console.log("selected sound id: ", soundId);

    setSelectedId(soundId);

    const sound = sounds.get(soundId as ESoundName);
    if (!sound) return;
    if (sound.isLoaded()) {
      sound.play((success) => {
        if (success) {
          console.log("successfully finished playing");
          return;
        }

        console.log("playback failed due to audio decoding errors");
      });
    }
  };

  return (
    <View style={s.root}>
      <View style={s.titleContainer}>
        <Text style={s.title}>사운드</Text>
      </View>

      <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
        <RadioButtonsGroup
          radioButtons={radioButtons}
          containerStyle={s.radioGroupContainer}
          onPress={onPress_Sound}
          selectedId={selectedId}
        />
      </ScrollView>
    </View>
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

    flex: 1,
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
