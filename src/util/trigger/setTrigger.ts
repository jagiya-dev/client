import { AndroidNotificationSetting } from "./../../../node_modules/@notifee/react-native/src/types/NotificationAndroid";
import { AndroidLaunchActivityFlag } from "@notifee/react-native/";
import notifee from "@notifee/react-native";
import { TriggerType } from "@notifee/react-native/src/types/Trigger";
import { TimestampTrigger } from "@notifee/react-native/dist/types/Trigger";
import dayjs from "dayjs";

export async function setTrigger() {
  const settings = await notifee.getNotificationSettings();
  if (settings.android.alarm == AndroidNotificationSetting.DISABLED) {
    await notifee.openAlarmPermissionSettings();
  }

  const date = dayjs().add(1, "minute").utc();
  console.log(date);

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.valueOf(),
    alarmManager: {
      allowWhileIdle: true,
    },
  };

  // android trigger doesn't open app after notification is pressed
  // https://github.com/invertase/notifee/issues/291
  await notifee.createTriggerNotification(
    {
      title: "우산 챙기세요!",
      body: "07 시 강남구에는 비가 올 예정입니다.",
      android: {
        channelId: "default",
        pressAction: {
          id: "default",
          // launchActivity: "com.jagiya.readyUmbrella",
          launchActivity: "com.jagiya.readyUmbrella.MainActivity",
          // launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
        },
      },
    },
    trigger,
  );
}
