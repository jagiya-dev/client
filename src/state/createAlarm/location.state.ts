import { BehaviorSubject, filter, map } from "rxjs";
import { LocationResponse } from "@/network/api";

export const addedLocations = new BehaviorSubject<LocationResponse[]>([]);
export const addedLocations$ = addedLocations.asObservable();
export const addedLocationForUI$ = addedLocations$.pipe(
  map((locations) => locations.map((loc) => `${loc.guGun} ${loc.eupMyun}`)),
);

const addLocation = (newLocation: LocationResponse) => {
  addedLocations.next([...addedLocations.value, newLocation]);
};

const removeLocation = (name: string) => {
  const { value } = addedLocations;
  addedLocations.next(
    value.filter((loc) => `${loc.guGun} ${loc.eupMyun}` !== name),
  );
};

const reset = () => {
  addedLocations.next([]);
};

export const behaviours = {
  addLocation,
  removeLocation,
  reset,
};
