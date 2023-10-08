import { Platform } from "react-native";
import Sound from "react-native-sound";

// init react-native-sound
Sound.setCategory("Playback");

const getAudioFileExtensionByPlatform = () =>
  Platform.OS === "android" ? ".ogg" : ".aac";

export enum ESoundName {
  emergency = "emergency",
  gravelRain = "gravel_rain",
  pedestrianRain = "pedestrian_rain",
  tableClock = "table_clock",
  tamacRain = "tamac_rain",
  thunderRain2 = "thunder_rain2",
  thunderRain = "thunder_rain",
  trailRain = "trail_rain",
  underRoofRain = "underRoof_rain",
  valleyRain = "valley_rain",
}
const soundName: ReadonlyArray<string> = Object.values(ESoundName);

const defaultSoundLoadCallback = (
  error: Error,
  soundResult: Sound,
  soundName: string,
) => {
  if (error) {
    console.log(
      `[${Platform.OS}] failed to load the sound ${soundName}`,
      error,
    );
    return;
  }

  // loaded successfully
  console.log(
    `[${Platform.OS}] LOAD SUCCESS! 
     loaded file: ${soundName},
     duration: ${soundResult.getDuration().toFixed(2)}s,
     number of channels: ${soundResult.getNumberOfChannels()}`,
  );
};

export const sounds = new Map<ESoundName, Sound>(
  soundName.map((config) => {
    const soundName = config as string;
    const soundResult: Sound = new Sound(
      soundName + getAudioFileExtensionByPlatform(),
      Sound.MAIN_BUNDLE,
      (error) => defaultSoundLoadCallback(error, soundResult, soundName),
    );

    return [soundName as ESoundName, soundResult];
  }),
);
