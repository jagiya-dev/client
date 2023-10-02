import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "@/components/Text";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import React from "react";
import { Button } from "@/components/button";
import TimeGridList from "@/screen/AddRegion/Time/TimeGridList";

const TimeTable = () => {
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
      <TimeGridList />

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
