import { AlarmModel } from "@/typing";
import { BehaviorSubject } from "rxjs";
import { genRandomAlarmItem } from "./alarm.helper";

const alarmModelSubject = new BehaviorSubject<ReadonlyArray<AlarmModel>>(
  new Array(5).fill(0).map(() => genRandomAlarmItem()),
);
export const whenAlarmModel = alarmModelSubject.asObservable();

const addNewAlarmItem = (newItem: AlarmModel) => {
  alarmModelSubject.next([ ...alarmModelSubject.value, newItem ]);
};

const deleteAlarmItem = (id: number) => {
  alarmModelSubject.next(
    alarmModelSubject.value.filter((item) => item.id !== id),
  );
};

const toggleAlarmToggleEnabled = (id: number) => {
  alarmModelSubject.next(
    alarmModelSubject.value.map((item) =>
      item.id == id ?
        { ...item, isEnabled: !item.isEnabled } :
        item
    ),
  );
};

const closeCurrentAlarm = () => {
};

const deferCurrentAlarm = () => {
};

export const behaviours = {
  addNewAlarmItem,
  deleteAlarmItem,
  toggleAlarmToggleEnabled,
  closeCurrentAlarm,
  deferCurrentAlarm,
};
