import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "@/components/Text";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import React from "react";
import { MapIcon } from "@/components/Icon";
import { Button } from "@/components/button";
import { BehaviorSubject } from "rxjs";
import { useObservableState } from "@/hook/useObservableState";

type TimetableItem = {
  time: string;
  isAvailable?: boolean;
  isSelected?: boolean;
};

const populateAMTimes = () => {
  // generate strings of 00:00 ~ 11:00 with 1 hour interval AM and feel with the TimetableItem type.
  const amItems: readonly TimetableItem[] = Array.from(
    { length: 12 },
    (_, i) => ({
      time: `${i.toString().padStart(2, "0")}:00`,
      isSelected: false,
      isAvailable: true,
    }),
  );

  return amItems;
};

const populatePMTimes = () => {
  // generate strings of 12:00 ~ 23:00 with 1 hour interval PM and feel with the TimetableItem type.
  const pmItems: readonly TimetableItem[] = Array.from(
    { length: 12 },
    (_, i) => ({
      time: `${(i + 12).toString().padStart(2, "0")}:00`,
      isSelected: false,
      isAvailable: true,
    }),
  );
  return pmItems;
};

const amTimetableSubject = new BehaviorSubject(populateAMTimes());
export const amTimetable$ = amTimetableSubject.asObservable();

const pmTimetableSubject = new BehaviorSubject(populatePMTimes());
export const pmTimetable$ = pmTimetableSubject.asObservable();

const TimeTable = () => {
  const amTimetables = useObservableState({
    observable: amTimetable$,
  });

  const pmTimetables = useObservableState({
    observable: pmTimetable$,
  });

  return (
    <View style={s.root}>
      {/* 1. label */}
      <View style={s.titleContainer}>
        <Text style={s.title}>지역 예보 시간 설정</Text>
      </View>

      {/* 2. 인덱스 */}
      <View style={s.indexContainer}>
        {/* 2-1. 선택 */}
        <View style={s.indexItem}>
          <View
            style={[s.indexCircle, { backgroundColor: color.primary["600"] }]}
          />
          <Text style={s.indexLabel}>선택</Text>
        </View>

        {/* 2-2. 불가 */}
        <View style={s.indexItem}>
          <View
            style={[s.indexCircle, { backgroundColor: color.gray["100"] }]}
          />
          <Text style={s.indexLabel}>불가</Text>
        </View>
      </View>

      {/* 3. 시간 선택 그리드 뷰 */}
      <View style={s.timeSelectContainer}>
        {/* 3-1. 오전 AM */}
        <Text style={s.timeLabel}>오전</Text>
        <View style={s.timeGrid}>
          {!!amTimetables &&
            amTimetables.map((data, i) => (
              <TouchableOpacity key={i}>
                <View style={s.timeItem}>
                  <Text style={s.timeItemLabel}>{data.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>

        {/* 3-2. 오후 PM */}
        <Text style={s.timeLabel}>오후</Text>
        <View style={s.timeGrid}>
          {!!pmTimetables &&
            pmTimetables.map((data, i) => (
              <TouchableOpacity key={i}>
                <View style={s.timeItem}>
                  <Text style={s.timeItemLabel}>{data.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </View>

      {/* 4. 저장 버튼 */}
      <View style={s.saveButtonContainer}>
        <Button style={s.saveButton}>
          <Text style={s.saveButtonInnerText}>확인</Text>
        </Button>
      </View>
    </View>
  );
};
export default TimeTable;

const s = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    position: "relative",
  },
  titleContainer: {
    paddingVertical: 8,
    marginHorizontal: "auto",
    marginBottom: 16,
  },
  title: {
    fontSize: font.title["2"].size,
    fontWeight: font.title["2"].weight,
    lineHeight: font.title["2"].height,
    alignSelf: "center",
  },
  label: {
    color: color.gray["300"],
    fontSize: font.body["5"].size,
    fontWeight: font.body["5"].weight,
    lineHeight: font.body["5"].height,
  },

  indexContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 8,
    gap: 15,
  },
  indexItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  indexCircle: {
    borderRadius: 8,
    width: 14,
    height: 14,
    marginRight: 10,
  },
  indexLabel: {
    color: color.gray["300"],
    fontSize: font.caption["2"].size,
    fontWeight: font.caption["2"].weight,
    lineHeight: font.caption["2"].height,
  },

  timeSelectContainer: {},

  timeLabel: {},

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    marginBottom: 16,
    // marginRight: 12,
  },

  timeItem: {
    minWidth: 76,
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 32,
    backgroundColor: color.gray["100"],
    borderWidth: 1,
    borderColor: color.gray["100"],
  },
  timeItemDisabled: {},
  timeItemSelected: {},
  timeItemLabel: {
    fontSize: font.body["2"].size,
    fontWeight: font.body["2"].weight,
    lineHeight: font.body["2"].height,
    color: color.gray["200"],
  },

  saveButtonContainer: {
    marginTop: 4,
  },
  saveButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 99,
    backgroundColor: color.primary["600"],
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonInnerText: {
    fontSize: font.title["2"].size,
    fontWeight: font.title["2"].weight,
    lineHeight: font.title["2"].height,
    color: "white",
  },
});
