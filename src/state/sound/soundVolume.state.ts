import { BehaviorSubject, debounceTime } from "rxjs";

// constants
const VOLUME_UPDATE_INTERVAL = 500;
const DEFAULT_SOUND_VOLUME = 0.5;

const soundVolumeSubject = new BehaviorSubject<number>(0.5);
export const whenSoundVolumeChange = soundVolumeSubject
  .asObservable()
  .pipe(debounceTime(VOLUME_UPDATE_INTERVAL));

let lastSoundVolume: number | null = null;
let currentSoundVolume: number = DEFAULT_SOUND_VOLUME;

const reset = () => {
  setSoundVolume(DEFAULT_SOUND_VOLUME);
};

const setSoundVolume = (volume: number) => {
  soundVolumeSubject.next(volume);
};

const mute = () => {
  lastSoundVolume = soundVolumeSubject.value;
  soundVolumeSubject.next(0);
};

const unmute = () => {
  soundVolumeSubject.next(lastSoundVolume || DEFAULT_SOUND_VOLUME);
};

export const behaviours = {
  reset,
  setSoundVolume,
  currentSoundVolume,
  mute,
  unmute,
};
