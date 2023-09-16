import { AlarmModel } from "@/typing";
import { BehaviorSubject } from "rxjs";
import { genAlarmItem } from "./alarm.helper";

export const alarmModelSubject = new BehaviorSubject<ReadonlyArray<AlarmModel>>(
  new Array(3).fill(0).map(() => genAlarmItem()),
);

const addNewAlarmItem = (newItem: AlarmModel) => {
  alarmModelSubject.next([...alarmModelSubject.value, newItem]);
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
  const targetAlarm = alarmModelSubject.value[foundIndex];
  targetAlarm.isEnabled = !targetAlarm.isEnabled;

  alarmModelSubject.next([
    ...alarmModelSubject.value.slice(0, foundIndex),
    targetAlarm,
    ...alarmModelSubject.value.slice(foundIndex + 1),
  ]);
};

export const whenToggleAlarmToggleEnabled = alarmModelSubject.pipe();

export const behaviours = {
  addNewAlarmItem,
  deleteAlarmItem,
  toggleAlarmToggleEnabled,
};
