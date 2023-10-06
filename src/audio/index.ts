import { Platform } from "react-native";
import Sound from "react-native-sound";

// init react-native-sound
Sound.setCategory("Playback");

const getAudioFileExtensionByPlatform = () =>
  Platform.OS === "android" ? `ogg` : `aac`;

const defaultSoundLoadCallback = (error: Error) => {
  if (error) {
    console.log(`[${Platform.OS}] failed to load the sound`, error);
    return;
  }

  // loaded successfully
  console.log(
    `[${Platform.OS}] LOAD SUCCESS! `,
    // duration: ${tableClockSound.getDuration().toFixed(2)}s,
    // number of channels: ${tableClockSound.getNumberOfChannels()}`,
  );
};

const soundName: ReadonlyArray<string> = ["table_clock", "emergency"];

const soundInitializer = () => soundInitializer;

export const sounds = new Map<string, Sound>(
  soundName.map((config) => {
    const key = config[0] as string;

    return [
      key,
      new Sound(
        key + getAudioFileExtensionByPlatform(),
        Sound.MAIN_BUNDLE,
        defaultSoundLoadCallback,
      ),
    ];
  }),
);
