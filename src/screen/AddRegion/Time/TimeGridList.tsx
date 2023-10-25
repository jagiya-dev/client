import Text from "@/components/Text";
import { StyleSheet, View } from "react-native";
import React from "react";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import {
  amTimetable$,
  behaviours,
  pmTimetable$,
} from "@/state/addRegion/regionTimetable.state";
import { useObservableState } from "@/hook/useObservableState";
import TimeTableItem from "@/screen/AddRegion/Time/TimeTableItem";

const TimeGridList = () => {
  const amTimetables = useObservableState({
    observable: amTimetable$,
  });

  const pmTimetables = useObservableState({
    observable: pmTimetable$,
  });

  const toggleTimeTableItemStateOfAM = (index: number) => {
    behaviours.toggleTimeTableStateOfAM(index);
  };

  const toggleTimeTableItemStateOfPM = (index: number) => {
    behaviours.toggleTimeTableStateOfPM(index);
  };

  return (
    <View style={s.timeSelectContainer}>
      {/* 3-1. 오전 AM */}
      <View style={s.timeGridSet}>
        <Text style={s.timeLabel}>오전</Text>

        <View style={s.timeGrid}>
          {!!amTimetables &&
            amTimetables.map((data, i) => (
              <TimeTableItem
                key={data.time}
                time={data.time}
                index={i}
                onSelected={(i) => toggleTimeTableItemStateOfAM(i)}
                state={data.state}
              />
            ))}
        </View>
      </View>

      {/* 3-2. 오후 PM */}
      <View style={s.timeGridSet}>
        <Text style={s.timeLabel}>오후</Text>

        <View style={s.timeGrid}>
          {!!pmTimetables &&
            pmTimetables.map((data, i) => (
              <TimeTableItem
                key={data.time}
                time={data.time}
                index={i}
                onSelected={(i) => toggleTimeTableItemStateOfPM(i)}
                state={data.state}
              />
            ))}
        </View>
      </View>
    </View>
  );
};
export default TimeGridList;

const s = StyleSheet.create({
  timeSelectContainer: {
    justifyContent: "flex-start",
    marginBottom: 28,
  },

  timeGridSet: {
    marginBottom: 8,
  },

  timeLabel: {
    fontSize: font.body["3"].size,
    fontWeight: font.body["3"].weight,
    lineHeight: font.body["3"].height,
    color: color.gray["600"],
  },

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    // marginBottom: 16,
  },
});
