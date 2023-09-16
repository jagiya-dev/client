import AlarmLocationItem from "@/components/alarm/Alarm.LocationItem";
import { Button, DateTextButton } from "@/components/button";
import { UmbrellaDisabledIcon, UmbrellaEnabledIcon } from "@/components/Icon";
import Text from "@/components/Text";
import { dummyDates } from "@/state/date/dummy";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import type { AlarmModel } from "@/typing";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import Toggle from "../toggle";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useEffect, useRef } from "react";
import { whenToggleDeleteMode } from "@/state/main/main.state";
import { behaviours as AlarmBehaviours } from "@/state/alarm/alarm.state";

function AlarmItem(props: AlarmModel) {
  const swipeableRef = useRef<Swipeable>(null);

  useEffect(() => {
    const dispose = whenToggleDeleteMode
      .subscribe((bEnable) => {
        if (bEnable) {
          swipeableRef.current?.openLeft();
          return;
        }

        swipeableRef.current?.close();
      });

    return () => dispose?.unsubscribe();
  }, [whenToggleDeleteMode, swipeableRef]);

  const onCloseLeftAction = () => AlarmBehaviours.deleteAlarmItem(props.id);
  const onPress_alarmToggleEnabled = () => AlarmBehaviours.toggleAlarmToggleEnabled(props.id);

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={(progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [0, 1000],
          outputRange: [0, 20],
        });

        return (
          <Button onPress={onCloseLeftAction} style={s.leftSwipeButtonContainer}>
            <Animated.Image
              style={[s.leftSwipeButton, { transform: [{ translateX: trans }] }]}
              source={require("#/icons/icon-minus.png")}
            />
          </Button>
        );
      }}>
      <Shadow
        offset={[0, 1]}
        distance={2}
        startColor="rgba(0, 0, 0, 0.1)"
        style={{
          ...s.root,
          ...(!props.isEnabled && s.disabledRoot)
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
                  isEnabled={
                    props.isEnabled && dateModel.item.isEnabled
                  }
                  onPress={() => { }} />
              )}
              style={s.dateContainer} />

            {/* 1-3. 시간 표시 */}
            <Text style={s.timeContainer}>
              <Text style={s.time12Text}>{props.time}</Text>
              <Text style={s.timeAMPMText}>
                {props.dateOfTime}
              </Text>
            </Text>
          </View>

          {/* 1-4. 알람 활성화 여부 토글 */}
          <Toggle
            onChange={onPress_alarmToggleEnabled}
            disabled={!props.isEnabled} />
        </View>

        {/* 2-1. 하단 부분 */}
        <View style={s.down}>
          <FlatList
            data={props.weathers}
            renderItem={(data) => (
              <AlarmLocationItem key={data.index} {...data.item} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false} />
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
    tintColor: "gray",
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
});
