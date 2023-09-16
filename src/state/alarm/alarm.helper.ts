import { AlarmModel } from "@/typing";
import * as rnd from "@/util/RandomHelper";
import { AllDateFlag, LenDateFlags } from "../date/dataFlag";

let uorder = 0;
function getUniqueId(): number {
  return uorder++;
}

export const genRandomAlarmItem = (): AlarmModel => ({
  id: getUniqueId(),
  isEnabled: rnd.randomBool(),
  enabledDates: rnd.pickOneOfFlags(AllDateFlag, LenDateFlags),
  time: rnd.randomTime(),
  dateOfTime: rnd.pickOneOfMany("AM", "PM"),
  weathers: [
    {
      weather: "day",
      location: "신당동",
    },
    {
      weather: "night",
      location: "국구정중앙면",
    },
    {
      weather: "day-night",
      location: "합정동",
    },
    {
      weather: "day-night",
      location: "합정동",
    },
    {
      weather: "day-night",
      location: "합정동",
    },
    {
      isAddNewWeather: true,
    },
  ],
});
