import notifee from "@notifee/react-native";
import { useCallback } from "react";
import { EventType } from "@notifee/react-native/src/types/Notification";
import { Platform } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export const useHandleForegroundNotification = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      return notifee.onForegroundEvent(async ({ type, detail }) => {
        const alarmId = detail.notification?.data?.alarmId;

        switch (type) {
          case EventType.DISMISSED:
            {
              console.log(
                `[${Platform.OS}] User dismissed notification`,
                detail.notification,
              );
              navigation.navigate("ActivatedAlarm", {
                alarmId,
              });
            }
            break;

          case EventType.PRESS:
            {
              console.log(
                `[${Platform.OS}] User pressed notification`,
                detail.notification,
              );
              navigation.navigate("ActivatedAlarm", {
                alarmId,
              });
            }
            break;

          case EventType.ACTION_PRESS:
            {
              console.log(
                `[${Platform.OS}] User pressed notification action`,
                detail.notification,
              );
              navigation.navigate("ActivatedAlarm", {
                alarmId,
              });
            }
            break;

          case EventType.DELIVERED:
            console.log(
              `[${Platform.OS}] User delivered notification`,
              detail.notification,
            );
            navigation.navigate("ActivatedAlarm", {
              alarmId,
            });
            break;

          case EventType.APP_BLOCKED:
            console.log(
              `[${Platform.OS}] User blocked notifications from the app`,
              detail.notification,
            );
            break;

          // case EventType.CHANNEL_BLOCKED:
          //   break;
          //
          // case EventType.CHANNEL_GROUP_BLOCKED:
          //   break;

          case EventType.TRIGGER_NOTIFICATION_CREATED:
            console.log(
              `[${Platform.OS}] Trigger notification created`,
              detail.notification,
            );
            break;
          case EventType.FG_ALREADY_EXIST:
            break;

          default:
            console.log(`[${Platform.OS}] ${type}`, JSON.stringify(detail));
            break;
        }
      });
    }, []),
  );
};
