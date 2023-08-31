import { FlatList, StyleSheet, View } from "react-native";
import { UmbrellaDisabledIcon, UmbrellaEnabledIcon } from "@/components/Icon";
import Text from "@/components/Text";
import AlarmLocationItem from "@/components/alarm/Alarm.LocationItem";
import { color } from "@/styles/color";
import { DateTextButton } from "@/components/button";
import { font } from "@/styles/font";
import type { AlarmModel } from "@/typing";
import { dummyDates } from "@/state/date/dummy";
import { Shadow } from "react-native-shadow-2";
import Toggle from "../toggle";

const AlarmItem = (props: AlarmModel) => (
  <Shadow
    offset={[0, 1]}
    distance={2}
    startColor="rgba(0, 0, 0, 0.1)"
    style={{
      ...s.root,
      ...(props.isEnabled && s.disabledRoot),
    }}
  >
    {/* 1. 상단 부분 */}
    <View style={s.up}>
      {/* 1-1. 날씨 아이콘 (enabled/disabled) */}
      <View>
        {props.isEnabled ? <UmbrellaEnabledIcon /> : <UmbrellaDisabledIcon />}
      </View>

      {/* 1-2. 알람 날짜 표시 (enabled/disabled) */}
      <View style={s.chronoContainer}>
        <FlatList
          data={dummyDates}
          renderItem={(dateModel) => (
            <DateTextButton
              key={dateModel.index}
              label={dateModel.item.label}
              isEnabled={props.isEnabled && dateModel.item.isEnabled}
              onPress={() => {}}
            />
          )}
          style={s.dateContainer}
        />

        {/* 1-3. 시간 표시 */}
        <Text style={s.timeContainer}>
          <Text style={s.time12Text}>{props.time}</Text>
          <Text
            style={{
              ...s.timeAMPMText,
              // ...(!props.isEnabled && s.timeDisabledText),
            }}
          >
            {props.dateOfTime}
          </Text>
        </Text>
      </View>

      {/* 1-4. 알람 활성화 여부 토글 */}
      <Toggle
        onChange={() => props.toggleAvailability()}
        disabled={!props.isEnabled}
      />
    </View>

    {/* 2-1. 하단 부분 */}
    <View style={s.down}>
      <FlatList
        data={props.weathers}
        renderItem={(data) => (
          <AlarmLocationItem key={data.index} {...data.item} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  </Shadow>
);

export default AlarmItem;

const s = StyleSheet.create({
  root: {
    // width: 352,
    height: 172,
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    borderColor: color.gray["100"],
    borderWidth: 1,

    // backgroundColor: "white",
  },
  disabledRoot: {
    tintColor: "gray",
    // opacity: 0.3,
  },

  // up
  up: {
    height: 112,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },

  // dates
  chronoContainer: {
    flexDirection: "column",
    width: 150,
    justifyContent: "center",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginBottom: 4,
    gap: 8,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  time12Text: {
    color: color.gray["700"],
    fontSize: font.display["1"].size,
    fontWeight: font.display["1"].weight,
    lineHeight: font.display["1"].height,
  },
  timeAMPMText: {
    color: color.gray["400"],
    fontSize: font.body["3"].size,
    fontWeight: font.body["3"].weight,
    // lineHeight: font.body["3"].height,
  },
  timeDisabledText: {
    tintColor: color.gray["200"],
  },

  // down
  down: {
    flexDirection: "row",
    height: 60,
    backgroundColor: color.gray["50"],
    paddingHorizontal: 8,
    alignItems: "center",
  },
});
