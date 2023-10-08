import { ESoundName, sounds } from "@/audio";
import Text from "@/components/Text";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RadioGroup } from "react-native-radio-buttons-group";

const radioButtons = Object.values(ESoundName).map((soundName) => ({
  id: soundName,
  label: soundName,
  value: soundName,
  selected: false,
}));

const AlarmSoundContainer = () => {
  const [selectedId, setSelectedId] = useState<string>("");

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
    <View>
      <Text>사운드</Text>

      <RadioGroup
        radioButtons={radioButtons}
        onPress={onPress_Sound}
        selectedId={selectedId}
      />
    </View>
  );
};
export default AlarmSoundContainer;

const s = StyleSheet.create({
  root: {},
});
