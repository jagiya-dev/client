import { AndroidNotificationSetting } from "./../../../node_modules/@notifee/react-native/src/types/NotificationAndroid";
import notifee from "@notifee/react-native";
import { TriggerType } from "@notifee/react-native/src/types/Trigger";
import { TimestampTrigger } from "@notifee/react-native/dist/types/Trigger";
import { Alert } from "react-native";
import { AlarmLocationRequest } from "@/network/api";

type TriggerOperationArgs = {
  alarmId: string;
  time: Date;
  locationList: readonly AlarmLocationRequest[];
  title: string;
};

export async function retrieveTriggerIds(): Promise<string[]> {
  return await notifee.getTriggerNotificationIds();
}
export async function isTriggerExist(alarmId: string): Promise<boolean> {
  try {
    return (await retrieveTriggerIds()).includes(alarmId);
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function cancelTrigger({
  alarmId,
}: Pick<TriggerOperationArgs, "alarmId">) {
  await notifee.cancelNotification(alarmId);
}

export async function createOrUpdateNewTrigger({
  alarmId,
  time,
  locationList,
  title,
}: TriggerOperationArgs) {
  let isGoodToCreateAlarm = true;

  const settings = await notifee.getNotificationSettings();

  if (settings.android.alarm === AndroidNotificationSetting.DISABLED) {
    await notifee.openAlarmPermissionSettings();

    if (settings.android.alarm === AndroidNotificationSetting.DISABLED) {
      Alert.alert(
        "알림 권한이 필요합니다.",
        "알람 생성을 위해서 알림 권한을 허용해주세요.",
        [{ text: "확인" }, { text: "취소" }],
        { cancelable: false },
      );
      isGoodToCreateAlarm = false;
      return;
    }
    isGoodToCreateAlarm = true;
  }

  if (!isGoodToCreateAlarm) return;

  if (await isTriggerExist(alarmId)) {
    console.log("trigger already exists, updating with ", alarmId);
  }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: time.valueOf(),
    alarmManager: {
      allowWhileIdle: true,
    },
  };

  const locationString = locationList.map(
    (loc) => loc.guGun + " " + loc.eupMyun,
  );

  // android trigger doesn't open app after notification is pressed
  // https://github.com/invertase/notifee/issues/291
  await notifee.createTriggerNotification(
    {
      id: alarmId,
      data: {
        alarmId,
      },
      title,
      body: `${time.getHours()}시 ${locationString}에는 비가 올 예정입니다.`,
      android: {
        channelId: "readyUmbrella",
        pressAction: {
          id: "default",
          launchActivity: "com.jagiya.readyUmbrella.MainActivity",
        },
      },
      ios: {
        sound: "default",
      },
    },
    trigger,
  );
}
