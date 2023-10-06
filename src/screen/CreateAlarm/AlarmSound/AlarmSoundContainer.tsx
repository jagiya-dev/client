import { sounds } from "@/audio";
import Text from "@/components/Text";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RadioGroup } from "react-native-radio-buttons-group";

const radioButtons = [
  {
    id: "1",
    label: "sound 1",
    value: "sound 1",
  },
  {
    id: "2",
    label: "sound 2",
    value: "sound 2",
  },
  {
    id: "3",
    label: "sound 3",
    value: "sound 3",
  },
];

const AlarmSoundContainer = () => {
  const [selectedId, setSelectedId] = useState<string>("");

  const onPress_Sound = (soundId: string) => {
    setSelectedId(soundId);

    const sound = sounds.get("table_clock");
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
