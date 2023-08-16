import { useEffect } from "react";

import {
  onRequestedLocationPermission,
  requestForLocationPermission,
} from "./location";
import {
  onRequestedNotificationPermission,
  requestForNotificationPermission,
} from "./notification";
import { getPermissions } from "./permission";

export const useRequestPermissions_Android = () => {
  useEffect(() => {
    const { location, notification } = getPermissions();

    requestForLocationPermission(location)
      .then(onRequestedLocationPermission)
      .catch((err) => {
        console.warn(err);
      });

    requestForNotificationPermission(notification)
      .then(onRequestedNotificationPermission)
      .catch((err) => {
        console.warn(err);
      });
  }, []);
};
