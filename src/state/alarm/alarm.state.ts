import { AlarmModel } from "@/typing";
import { catchError, map, of } from "rxjs";
import { fromFetch } from "rxjs/fetch";

import { URL_ROOT } from "@/network/api/api.mutator";
import { GetAlarmList200 } from "@/network/api";
import { local } from "@/state/auth/auth.state.local";

const fetchGetAlarmList = fromFetch<GetAlarmList200>(
  `${URL_ROOT}/alarm/getAlarmList?userId=${local.localAuthState.userId}`,
  {
    method: "GET",
    selector: (response) => response.json(),
  },
);
export const alarmList$ = fetchGetAlarmList.pipe(
  map((parsed) => parsed.data),
  // catchError((err) => {
  //   console.error(err);
  //   return of({ error: true, message: err.message });
  // }),
);

const addNewAlarmItem = (newItem: AlarmModel) => {
  // fetchGetAlarmList.next([...fetchGetAlarmList.value, newItem]);
};

const deleteAlarmItem = (id: number) => {
  // fetchGetAlarmList.next(
  //   fetchGetAlarmList.value.filter((item) => item.id !== id),
  // );
};

const toggleAlarmToggleEnabled = (id: number) => {
  // todo: PUT 으로 실제 알람 수정
  // fetchGetAlarmList.next(
  //   fetchGetAlarmList.value.map((item) =>
  //     item.id == id ? { ...item, isEnabled: !item.isEnabled } : item,
  //   ),
  // );
};

const closeCurrentAlarm = () => {};

const deferCurrentAlarm = () => {};

export const behaviours = {
  addNewAlarmItem,
  deleteAlarmItem,
  toggleAlarmToggleEnabled,
  closeCurrentAlarm,
  deferCurrentAlarm,
};
