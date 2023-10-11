import { BehaviorSubject } from "rxjs";
import { ESoundName, soundNameAsLabel, soundResourcesMap } from "@/audio";
import { SoundItem } from "@/typing";

const alarmSoundItems: SoundItem[] = Object.values(ESoundName).map(
  (soundName: ESoundName, i) => ({
    id: soundName,
    label: soundNameAsLabel(soundName),
    isSelected: i === 0,
  }),
);

const alarmSoundItemsSubject = new BehaviorSubject<SoundItem[]>(
  alarmSoundItems,
);
export const whenSoundItemsChange = alarmSoundItemsSubject.asObservable();

const selectedSoundSubject = new BehaviorSubject<ESoundName | null>(null);
export const whenSelectedSoundChange = selectedSoundSubject.asObservable();

const toggleSoundItem = (soundId: string): void => {
  const { value: soundItems } = alarmSoundItemsSubject;
  if (!soundItems) return;

  const newSoundItems = soundItems.map((item) =>
    item.id === soundId
      ? {
          ...item,
          isSelected: !item.isSelected,
        }
      : {
          ...item,
          isSelected: false,
        },
  );

  alarmSoundItemsSubject.next(newSoundItems);
};

const isSelected = (soundId: string) => {
  const { value: soundItems } = alarmSoundItemsSubject;
  if (!soundItems) return false;

  const soundItem = soundItems.find((item) => item.id === soundId);
  if (!soundItem) return false;

  return soundItem.isSelected;
};

const selectSound = (soundId: string) => {
  toggleSoundItem(soundId);

  const asEnum = soundId as ESoundName;
  selectedSoundSubject.next(asEnum);

  const sound = soundResourcesMap.get(asEnum);
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

export const behaviours = {
  selectSound,
  toggleSoundItem,
  isSelected,
};
