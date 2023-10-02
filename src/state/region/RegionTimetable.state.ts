import { BehaviorSubject } from "rxjs";
import { amItems, pmItems } from "@/state/region/regionTimetable.data";

const amTimetableSubject = new BehaviorSubject(amItems);
export const amTimetable$ = amTimetableSubject.asObservable();

const pmTimetableSubject = new BehaviorSubject(pmItems);
export const pmTimetable$ = pmTimetableSubject.asObservable();
