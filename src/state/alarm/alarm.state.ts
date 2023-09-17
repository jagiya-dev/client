
import { AlarmModel } from "@/typing";
import { BehaviorSubject } from "rxjs";
import { genRandomAlarmItem } from "./alarm.helper";

export const alarmModelSubject = new BehaviorSubject<ReadonlyArray<AlarmModel>>(
  new Array(5).fill(0).map(() => genRandomAlarmItem()),
);

const addNewAlarmItem = (newItem: AlarmModel) => {
  alarmModelSubject.next([ ...alarmModelSubject.value, newItem ]);
};

const deleteAlarmItem = (id: number) => {
  alarmModelSubject.next(
    alarmModelSubject.value.filter((item) => item.id !== id),
  );
};

const toggleAlarmToggleEnabled = (id: number) => {
  const foundIndex = alarmModelSubject.value.findIndex(
    (item) => item.id === id,
  );

  if (foundIndex === -1) {
    return;
  }

  const targetAlarm = alarmModelSubject.value[foundIndex];

  alarmModelSubject.next([
    ...alarmModelSubject.value.slice(0, foundIndex),
    { ...targetAlarm, isEnabled: !targetAlarm.isEnabled },
    ...alarmModelSubject.value.slice(foundIndex + 1),
  ]);
};

const closeCurrentAlarm = () => {

};

const deferCurrentAlarm = () => {
};

export const whenToggleAlarmToggleEnabled = alarmModelSubject.pipe();
export const whenScheduledAlarmsChange = alarmModelSubject.asObservable();

export const behaviours = {
  addNewAlarmItem,
  deleteAlarmItem,
  toggleAlarmToggleEnabled,
  closeCurrentAlarm,
  deferCurrentAlarm
};
