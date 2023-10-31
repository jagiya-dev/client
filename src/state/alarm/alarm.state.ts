import { AlarmModel } from "@/typing";
import { BehaviorSubject, of, take } from "rxjs";
import { fromFetch } from "rxjs/fetch";

import { URL_ROOT } from "@/network/api/api.mutator";
import {
  AlarmResponse,
  deleteAlarm,
  GetAlarmList200,
  updateAlarmEnabled,
} from "@/network/api";
import { local } from "@/state/auth/auth.state.local";

const alarms = new BehaviorSubject<readonly AlarmResponse[]>([]);

const fetchGetAlarmList = fromFetch<GetAlarmList200>(
  `${URL_ROOT}/alarm/getAlarmList?userId=${local.localAuthState.userId}`,
  {
    method: "GET",
    selector: (response) => {
      if (response.ok) {
        return response.json();
      }

      return of({ error: true, message: `Error ${response.status}` });
    },
  },
);

fetchGetAlarmList
  .pipe(take(4))
  .subscribe((parsed) => alarms.next(parsed.data ?? []));

export const alarmList$ = alarms.asObservable();

const addNewAlarmItem = (newItem: AlarmModel) => {
  // fetchGetAlarmList.next([...fetchGetAlarmList.value, newItem]);
};

const deleteAlarmItem = (id: number) => {
  // fetchGetAlarmList.next(
  //   fetchGetAlarmList.value.filter((item) => item.id !== id),
  // );
};

const toggleAlarmToggleEnabled = async (alarmId?: number, enabled?: number) => {
  console.log(alarmId, enabled);

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

const closeCurrentAlarm = async (alarmId?: number) => {
  try {
    const response = await deleteAlarm({
      alarmId,
    });
    console.log(JSON.stringify(response, null, 2));

    const { value: prevAlarms } = alarms;
    const nextAlarms = prevAlarms.filter((alarm) => alarm.alarmId !== alarmId);

    alarms.next(nextAlarms);
  } catch (err) {
    console.error(err);
  }
};

const deferCurrentAlarm = (alarmId?: number) => {};

export const behaviours = {
  addNewAlarmItem,
  deleteAlarmItem,
  toggleAlarmToggleEnabled,
  closeCurrentAlarm,
  deferCurrentAlarm,
};
