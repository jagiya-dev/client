import notifee from "@notifee/react-native";
import { EventType } from "@notifee/react-native/src/types/Notification";
import { useEffect } from "react";
import { Platform } from "react-native";

export const handleBackgroundNotification = async () => {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log(
          `[${Platform.OS}] User dismissed notification`,
          detail.notification,
        );
        break;

      case EventType.PRESS:
        console.log(
          `[${Platform.OS}] User pressed notification`,
          detail.notification,
        );
        break;

      case EventType.ACTION_PRESS:
        console.log(
          `[${Platform.OS}] User pressed notification action`,
          detail.notification,
        );
        break;

      case EventType.DELIVERED:
        console.log(
          `[${Platform.OS}] User delivered notification`,
          detail.notification,
        );
        break;

      case EventType.APP_BLOCKED:
        console.log(
          `[${Platform.OS}] User blocked notifications from the app`,
          detail.notification,
        );
        break;

      case EventType.TRIGGER_NOTIFICATION_CREATED:
        console.log(
          `[${Platform.OS}] Trigger notification created`,
          detail.notification,
        );
        break;

      default:
        console.log(`[${Platform.OS}] ${type}`, JSON.stringify(detail));
        break;
    }
  });
};
