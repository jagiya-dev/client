import { Platform } from "react-native";
import Sound from "react-native-sound";

// init react-native-sound
Sound.setCategory("Alarm", true);

const getAudioFileExtensionByPlatform = () =>
  Platform.OS === "android" ? ".ogg" : ".aac";

export enum ESoundName {
  emergency = "emergency",
  gravelRain = "gravel_rain",
  pedestrianRain = "pedestrian_rain",
  tableClock = "table_clock",
  tamacRain = "tamac_rain",
  thunderRainy = "thunder_rainy",
  thunderRain = "thunder_rain",
  trailRain = "trail_rain",
  underRoofRain = "under_roof_rain",
  valleyRain = "valley_rain",
}

export const soundNameAsLabel = (soundName: ESoundName) => {
  switch (soundName) {
    case ESoundName.emergency:
      return "긴급";
    case ESoundName.gravelRain:
      return "자갈밭";
    case ESoundName.pedestrianRain:
      return "보도블럭";
    case ESoundName.tableClock:
      return "탁상시계";
    case ESoundName.tamacRain:
      return "아스팔트";
    case ESoundName.thunderRain:
      return "천둥";
    case ESoundName.thunderRainy:
      return "천둥2";
    case ESoundName.trailRain:
      return "산책로";
    case ESoundName.underRoofRain:
      return "지붕아래";
    case ESoundName.valleyRain:
      return "계곡";
  }
};
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
  // console.log(
  //   `[${Platform.OS}] LOAD SUCCESS!
  //    loaded file: ${soundName},
  //    duration: ${soundResult.getDuration().toFixed(2)}s,
  //    number of channels: ${soundResult.getNumberOfChannels()}`,
  // );
};

export const soundResourcesMap = new Map<ESoundName, Sound>(
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
