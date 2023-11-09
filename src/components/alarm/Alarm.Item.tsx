import { Button, DateTextButton } from "@/components/button";
import { UmbrellaDisabledIcon, UmbrellaEnabledIcon } from "@/components/Icon";
import Text from "@/components/Text";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import {
  Animated,
  FlatList,
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import Toggle from "../toggle";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useRef } from "react";
import { whenToggleDeleteMode } from "@/state/main/main.state";
import { useObservableEffect } from "@/hook/useObservableEffect";
import { cond } from "@/util/StyleHelper";
import type { AlarmResponse } from "@/network/api";
import AlarmLocationItem from "@/components/alarm/Alarm.LocationItem";
import AlarmAddLocationItem from "@/components/alarm/Alarm.AddLocationItem";
import { behaviours as AlarmBehaviours } from "@/state/alarm/alarm.state";
import { useNavigation } from "@react-navigation/native";
import { weekDaysLabel } from "@/state/const";
import { cancelTrigger } from "@/util/trigger";

const AlarmItem = (alarm: AlarmResponse) => {
  const isItemEnabled = alarm.enabled === 1;

  // console.log(JSON.stringify(alarm, null, 2));

  let time: string = alarm.alarmTime ?? "0000";
  time = [...time.substring(0, 2), ":", ...time.substring(2, 4)].join("");

  const swipeableRef = useRef<Swipeable>(null);
  const { navigate } = useNavigation();

  useObservableEffect({
    observable: whenToggleDeleteMode,
    subscribeFn: (bEnable) => {
      if (bEnable) {
        swipeableRef.current?.openLeft();
        return;
      }

      swipeableRef.current?.close();
    },
    dependencies: [swipeableRef],
  });

  const onClose_deleteAlarm = async () => {
    AlarmBehaviours.deleteCurrentAlarm(alarm.alarmId);
    await cancelTrigger(alarm.alarmId?.toString() ?? "");
  };

  const onPress_alarmToggleEnabled = () => {
    AlarmBehaviours.toggleAlarmToggleEnabled(alarm.alarmId, alarm.enabled);
  };

  const onPressButton_openEditAlarm = () => {
    navigate("CreateAlarm", {
      isEditRegion: false,
      alarm,
    });
  };

  const onPressButton_openEditRegion = () => {
    navigate("CreateAlarm", {
      isEditRegion: true,
      alarm,
    });
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={(progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [0, 1000],
          outputRange: [0, 20],
        });

        return (
          <Button
            onPress={onClose_deleteAlarm}
            style={s.leftSwipeButtonContainer}
          >
            <Animated.Image
              style={[
                s.leftSwipeButton,
                { transform: [{ translateX: trans }] },
              ]}
              source={require("#/icons/minus.png")}
            />
          </Button>
        );
      }}
    >
      <Shadow
        offset={[0, 1]}
        distance={2}
        startColor="rgba(0, 0, 0, 0.1)"
        stretch
        style={cond({
          predicate: () => isItemEnabled,
          true$: s.disabledRoot,
          underlyingStyles: s.root,
        })}
      >
        {/* 1. 상단 부분 */}
        <TouchableWithoutFeedback onPress={onPressButton_openEditAlarm}>
          <View style={s.up}>
            {/* 1-1. 날씨 아이콘 (enabled/disabled) */}
            <View>
              {isItemEnabled ? (
                <UmbrellaEnabledIcon />
              ) : (
                <UmbrellaDisabledIcon />
              )}
            </View>

            {/* 1-2. 알람 날짜 표시 (enabled/disabled) */}
            <View style={s.chronoContainer}>
              <View style={s.dateContainer}>
                {weekDaysLabel.map((label, i) => (
                  <DateTextButton
                    key={i}
                    label={label[0]}
                    isEnabled={
                      isItemEnabled &&
                      alarm.alarmWeek?.some(
                        (week) => week.alarmWeekId === i + 1,
                      )
                    }
                  />
                ))}
              </View>

              {/* 1-3. 시간 표시 */}
              <Text style={s.timeContainer}>
                <Text
                  style={cond({
                    predicate: () => !isItemEnabled,
                    true$: s.disabledText,
                    underlyingStyles: s.time12Text,
                  })}
                >
                  {time}
                </Text>
                <Text
                  style={cond({
                    predicate: () => !isItemEnabled,
                    true$: s.disabledText,
                    underlyingStyles: s.timeAMPMText,
                  })}
                >
                  {alarm.timeOfDay}
                </Text>
              </Text>
            </View>

            {/* 1-4. 알람 활성화 여부 토글 */}
            <Toggle
              onValueChange={onPress_alarmToggleEnabled}
              disabled={!isItemEnabled}
            />
          </View>
        </TouchableWithoutFeedback>

        {/* 2-1. 하단 부분 */}
        <TouchableWithoutFeedback onPress={onPressButton_openEditAlarm}>
          <View style={s.down}>
            <FlatList
              // 알람 위치 마지막에 + 버튼 추가
              data={[...(alarm.alarmLocation ?? []), { isAddNewItem: true }]}
              renderItem={(data) => {
                if ("isAddNewItem" in data.item) {
                  return (
                    <AlarmAddLocationItem
                      isEnabled={isItemEnabled}
                      onPressButton={onPressButton_openEditRegion}
                    />
                  );
                }

                return (
                  <AlarmLocationItem
                    key={data.index}
                    isEnabled={isItemEnabled}
                    {...data.item}
                  />
                );
              }}
              style={{
                ...Platform.select({
                  android: {
                    zIndex: 5,
                  },
                }),
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={isItemEnabled}
            />
          </View>
        </TouchableWithoutFeedback>
      </Shadow>
    </Swipeable>
  );
};

export default AlarmItem;

const s = StyleSheet.create({
  root: {
    width: 352,
    height: 172,
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    borderColor: color.gray["100"],
    borderWidth: 1,
  },
  disabledRoot: {
    tintColor: color.gray["200"],
  },

  // up
  up: {
    height: 112,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "white",
  },

  leftSwipeButtonContainer: {
    justifyContent: "center",
    paddingRight: 20,
  },
  leftSwipeButton: {
    width: 22,
    height: 22,
    borderRadius: 100,
    backgroundColor: color.warning,
    tintColor: "white",
  },

  // dates
  chronoContainer: {
    flexDirection: "column",
    width: 150,
    justifyContent: "center",
  },
  dateContainer: {
    flexDirection: "row",
    marginBottom: 4,
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

  disabledText: {
    color: color.gray["200"],
  },
});
