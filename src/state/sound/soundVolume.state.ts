import { BehaviorSubject, debounceTime } from "rxjs";

const soundVolumeSubject = new BehaviorSubject<number>(0.5);
const VOLUME_UPDATE_INTERVAL = 500;
export const whenSoundVolumeChange = soundVolumeSubject
  .asObservable()
  .pipe(debounceTime(VOLUME_UPDATE_INTERVAL));

let lastSoundVolume: number | null = null;
let currentSoundVolume: number = 0.5;

const setSoundVolume = (volume: number) => {
  soundVolumeSubject.next(volume);
};

const mute = () => {
  lastSoundVolume = soundVolumeSubject.value;
  soundVolumeSubject.next(0);
};

const unmute = () => {
  soundVolumeSubject.next(lastSoundVolume || 0.5);
};

export const behaviours = {
  setSoundVolume,
  currentSoundVolume,
  mute,
  unmute,
};
