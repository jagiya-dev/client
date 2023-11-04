import { BehaviorSubject, map } from "rxjs";

import {
  type AlarmResponse,
  deleteAlarm,
  updateAlarmEnabled,
} from "@/network/api";

export const alarms = new BehaviorSubject<readonly AlarmResponse[]>([]);
export const alarmList$ = alarms.asObservable();
export const alarmCount$ = alarms.pipe(map((alarms) => alarms.length));

const toggleAlarmToggleEnabled = async (alarmId?: number, enabled?: number) => {
  try {
    const nextEnabled = enabled === 0 ? 1 : 0;
    await updateAlarmEnabled({
      alarmId,
      enabled: nextEnabled,
    });

    // console.log(JSON.stringify(response, null, 2));

    const { value: prevAlarms } = alarms;

    const nextAlarms = prevAlarms.map((alarm) =>
      alarm.alarmId === alarmId
        ? {
            ...alarm,
            enabled: nextEnabled,
          }
        : alarm,
    );

    alarms.next(nextAlarms);
  } catch (err) {
    console.error(err);
  }
};

const deleteCurrentAlarm = async (alarmId?: number) => {
  try {
    await deleteAlarm({
      alarmId,
    });

    // console.log(JSON.stringify(response, null, 2));

    const { value: prevAlarms } = alarms;
    const nextAlarms = prevAlarms.filter((alarm) => alarm.alarmId !== alarmId);

    alarms.next(nextAlarms);
  } catch (err) {
    console.error(err);
  }
};

const deferCurrentAlarm = (alarmId?: number) => {};

export const behaviours = {
  toggleAlarmToggleEnabled,
  deleteCurrentAlarm,
  deferCurrentAlarm,
};
