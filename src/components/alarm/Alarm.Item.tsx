import {
  FlatList,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { UmbrellaDisabledIcon, UmbrellaEnabledIcon } from "@/components/Icon";
import Text from "@/components/Text";
import type { AlarmData, AlarmModel } from "./Alarm.Container";
import { useState } from "react";
import AlarmLocationItem from "@/components/alarm/Alarm.LocationItem";
import { style } from "@/styles/style";
import AlarmAddLocationItem from "@/components/alarm/Alarm.AddLocationItem";
import { color } from "@/styles/color";

// const AlarmDateIndicator = ({ enabledDates}: { enabledDates: number }) => {
//   return
// }

const AlarmItem = (props: AlarmModel) => {
  const [state] = useState(props);

  return (
    <View style={s.root}>
      {/* 1. 상단 부분 */}
      <View style={s.up}>
        {/* 1-1. 날씨 아이콘 (enabled/disabled) */}
        <View>
          {state.isEnabled ? <UmbrellaEnabledIcon /> : <UmbrellaDisabledIcon />}
        </View>

        {/* 1-2. 알람 날짜 표시 (enabled/disabled) */}
        <View>
          <View style={s.dateContainer}>
            <TouchableOpacity>
              <Text>월</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>화</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>수</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>목</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>금</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>토</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>일</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 1-3. 시간 표시 */}
        <View>
          <Text>
            <Text>{state.time}</Text>
            <Text>{state.dateOfTime}</Text>
          </Text>
        </View>

        {/* 1-4. 알람 활성화 여부 토글 */}
        <Switch
          value={state.isEnabled}
          onChange={() => state.toggleAvailability()}
        />
      </View>

      {/* 2-1. 하단 부분 */}
      <View style={s.down}>
        <FlatList
          data={state.weathers}
          renderItem={(data) => (
            <AlarmLocationItem key={data.index} {...data.item} />
          )}
          style={s.locationItemContainer}
        />
        <AlarmAddLocationItem />
      </View>
    </View>
  );
};

export default AlarmItem;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: 352,
    height: 172,
    borderColor: color.gray["300"],
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: color.gray["300"],
  },

  // up
  up: { ...style.flex.center, flexDirection: "row" },
  dateContainer: {
    flexDirection: "row",
  },

  // down
  down: { ...style.flex.center, flexDirection: "row", flex: 1 },
  locationItemContainer: {
    flexDirection: "row",
  },
});
