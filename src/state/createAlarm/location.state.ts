import { BehaviorSubject, filter, map, reduce } from "rxjs";
import { LocationResponse } from "@/network/api";

export const addedLocations = new BehaviorSubject<LocationResponse[]>([]);
export const addedLocations$ = addedLocations.asObservable();
export const addedLocationForUI$ = addedLocations$.pipe(
  filter((locations) => locations.length > 0),
  map((locations) => locations.map((loc) => `${loc.guGun} ${loc.eupMyun}`)),
);

const addLocation = (newLocation: LocationResponse) => {
  addedLocations.next([...addedLocations.value, newLocation]);
};

export const behaviours = {
  addLocation,
};
