import { Button, DateTextButton } from "@/components/button";
import { UmbrellaDisabledIcon, UmbrellaEnabledIcon } from "@/components/Icon";
import Text from "@/components/Text";
import { dummyDates } from "@/state/date/dummy";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { Animated, FlatList, Platform, StyleSheet, View } from "react-native";
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

function AlarmItem(props: AlarmResponse) {
  const isItemEnabled = props.enabled === 1;
  const swipeableRef = useRef<Swipeable>(null);

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

  const onCloseLeftAction = () => {
    console.log("close left action! delete");
    // AlarmBehaviours.deleteAlarmItem(props);
  };

  const onPress_alarmToggleEnabled = () => {
    if (!props.alarmId) return;
    console.log("onPress_alarmToggleEnabled");
    AlarmBehaviours.toggleAlarmToggleEnabled(props.alarmId);
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
            onPress={onCloseLeftAction}
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
        <View style={s.up}>
          {/* 1-1. 날씨 아이콘 (enabled/disabled) */}
          <View>
            {isItemEnabled ? <UmbrellaEnabledIcon /> : <UmbrellaDisabledIcon />}
          </View>

          {/* 1-2. 알람 날짜 표시 (enabled/disabled) */}
          <View style={s.chronoContainer}>
            <FlatList
              data={dummyDates}
              renderItem={(dateModel) => (
                <DateTextButton
                  key={dateModel.index}
                  label={dateModel.item.label}
                  isEnabled={isItemEnabled && dateModel.item.isEnabled}
                  onPress={() => {}}
                />
              )}
              style={s.dateContainer}
            />

            {/* 1-3. 시간 표시 */}
            <Text style={s.timeContainer}>
              <Text
                style={cond({
                  predicate: () => isItemEnabled,
                  true$: s.disabledText,
                  underlyingStyles: s.time12Text,
                })}
              >
                {props.alarmTime}
              </Text>
              <Text
                style={cond({
                  predicate: () => !isItemEnabled,
                  true$: s.disabledText,
                  underlyingStyles: s.timeAMPMText,
                })}
              >
                {props.timeOfDay}
              </Text>
            </Text>
          </View>

          {/* 1-4. 알람 활성화 여부 토글 */}
          <Toggle
            onValueChange={onPress_alarmToggleEnabled}
            disabled={!isItemEnabled}
          />
        </View>

        {/* 2-1. 하단 부분 */}
        <View style={s.down}>
          <FlatList
            // 알람 위치 마지막에 + 버튼 추가
            data={[...(props.alarmLocation ?? []), { isAddNewItem: true }]}
            renderItem={(data) => {
              if ("isAddNewItem" in data.item)
                return <AlarmAddLocationItem isEnabled={isItemEnabled} />;

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
      </Shadow>
    </Swipeable>
  );
}

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
