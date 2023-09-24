import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  View
} from "react-native";
import { useInitNotification } from "@/util/notification/useInitNotification";
import {
  useHandleForegroundNotification
} from "@/util/notification/useHandleForegroundNotification";
import Text from "@/components/Text";
import { CloseIcon, RightArrowIcon, SoundVolumeIcon, VibrationIcon } from "@/components/Icon";
import { useEffect, useState } from "react";
import DatePicker from "react-native-date-picker";
import { color } from "@/styles/color";
import { Shadow } from "react-native-shadow-2";
import { Button } from "@/components/button";
import { createNewTrigger } from "@/util/trigger/setTrigger";
import DeviceInfo from "react-native-device-info";
import { font } from "@/styles/font";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Slider } from "@miblanchard/react-native-slider";
import { SliderOnChangeCallback } from "@miblanchard/react-native-slider/lib/types";
import { useObservableState } from "@/hook/useObservableState";
import { whenSoundVolumeChange } from "@/state/sound/sound.state";
import { behaviours as soundBehaviours } from "@/state/sound/sound.state";

const CreateAlarmScreen = () => {
  const [date, setDate] = useState<Date>(new Date());
  const soundVolume = useObservableState({
    observable: whenSoundVolumeChange
  });

  const onChangeSliderValue: SliderOnChangeCallback = (value) => {
    if (!isNaN(value[0])) {
      const volume = Number(value[0].toFixed(2));
      soundBehaviours.setSoundVolume(volume);
    }
  }

  useEffect(() => {
    console.log("current date: ", date.toDateString());
  }, [date]);

  useHandleForegroundNotification();
  const loading = useInitNotification();
  if (loading) {
    return null;
  }

  return (
    <SafeAreaView style={s.root}>
      {/* <ScrollView contentContainerStyle={s.scrollRoot}> */}
      {/* 1. timepicker */}
      <View style={s.timePickerContainer}>
        <DatePicker date={date} onDateChange={setDate} mode="time" />
      </View>

      {/* 2. set repeat */}
      <Shadow
        offset={[0, 2]}
        distance={2}
        startColor="rgba(0, 0, 0, 0.1)"
        style={s.itemBlockShadow}
      >
        <View style={s.itemBlockContainer}>
          <Text style={s.itemBlockLabel}>반복</Text>

          <View style={s.itemBlockRight}>
            <Text style={s.itemBlockLabel}>주중</Text>
            <View style={s.itemBlockRightSpacer} />
            <RightArrowIcon style={s.itemBlockIcon} />
          </View>
        </View>
      </Shadow>

      {/* 3. set alarm sound */}
      <View style={s.alarmSoundContainer}>
        <Text style={s.alarmSoundLabel}>
          어떤 소리로 알려드릴까요?
        </Text>

        <Shadow
          offset={[0, 2]}
          distance={2}
          startColor="rgba(0, 0, 0, 0.1)"
          style={s.itemBlockShadow}
        >
          <View style={s.alarmSoundItemContainer}>
            <View style={[s.alarmSoundItem, s.alarmSoundItemBorderBottom]}>
              <Text style={s.itemBlockLabel}>
                사운드
              </Text>

              <View style={s.itemBlockRight}>
                <Text style={s.itemBlockLabel}>
                  기본알람
                </Text>
                <View style={s.itemBlockRightSpacer} />
                <RightArrowIcon style={s.itemBlockIcon} />
              </View>
            </View>

            <View style={[s.alarmSoundItem, s.alarmSoundItemBorderBottom]}>
              <Text style={s.itemBlockLabel}>볼륨</Text>
              <SoundVolumeIcon />
              <View style={s.sliderContainer}>
                <Slider
                  value={soundVolume}
                  onValueChange={onChangeSliderValue}
                  step={0.05}
                  thumbTintColor="white"
                  thumbStyle={{
                    shadowColor: "black",
                    ...Platform.select({
                      android: {
                        elevation: 3
                      },
                      ios: {
                        shadowRadius: 3,
                        shadowOpacity: 0.2,
                        shadowOffset: {
                          width: 1,
                          height: 3
                        }
                      }
                    })
                  }}
                  minimumTrackTintColor={color.primary["600"]}
                />
              </View>
              <VibrationIcon />
            </View>

            <View style={s.alarmSoundItem}>
              <Text style={s.itemBlockLabel}>다시알림</Text>

              <View style={s.itemBlockRight}>
                <Text style={s.itemBlockLabel}>5분</Text>
                <View style={s.itemBlockRightSpacer} />
                <RightArrowIcon style={s.itemBlockIcon} />
              </View>
            </View>

          </View>
        </Shadow>
      </View>

      {/* 4. set location */}
      <View style={s.locationContainer} >
        <Text>JAGIYA님이</Text>
        <Text>활동하는 지역들을 추가해주세요.</Text>
        <Text>(지역은 최대 4개까지 추가할 수 있어요)</Text>

        <Button onPress={createNewTrigger}>
          <Text>알람</Text>
        </Button>

        <FlatList
          data={["지역이름동", "지역이름동", "지역이름동", "지역이름동",]}
          renderItem={(data) => (
            <Shadow
              offset={[0, 2]}
              distance={2}
              startColor="rgba(0, 0, 0, 0.1)"
              style={s.itemBlockShadow}
              key={data.index}
            >
              <View
                style={[s.itemBlockContainer, s.itemBlockHalfContainer]}>
                <Text style={s.itemBlockLabel}>{data.item}</Text>

                <View style={s.itemBlockRight}>
                  <View style={s.itemBlockRightSpacer} />
                  <RightArrowIcon style={s.itemBlockIcon} />
                </View>
              </View>
            </Shadow>
          )} />
      </View >

      {/* </ScrollView> */}
    </SafeAreaView >
  );
};

export default CreateAlarmScreen;

const s = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: color.gray["50"],
  },
  scrollRoot: {
    alignItems: "center",
  },

  // 1. header
  headerContainer: {
    width: widthPercentageToDP("100%"),
    height: 30,

    flexDirection: "row",
    // justifyContent: "center",

    marginBottom: 46,
    marginLeft: 'auto',
    position: "relative",
  },
  headerText: {
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    lineHeight: font.body["1"].height,
    color: color.gray["700"],
  },
  headerCloseIcon: {
    // position: "absolute",
    right: 0
  },

  // 2. timepicker
  timePickerContainer: {
    alignItems: "center",
    marginBottom: 14,
  },

  // 3. set repeat
  itemBlockShadow: {
    ...Platform.select({
      android: {
        marginRight: 1,
        marginBottom: 2,
      }
    })
  },
  itemBlockContainer: {
    width: 317,
    height: 54,

    paddingHorizontal: 16,
    paddingVertical: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderRadius: 8,
    backgroundColor: "white",
  },
  itemBlockHalfContainer: {
    width: 317 * 0.5,
  },
  itemBlockLabel: {
    color: color.gray["700"],
    marginRight: 16,
  },
  itemBlockIcon: {
    tintColor: color.gray["200"]
  },
  itemBlockRight: {
    flexDirection: "row",
  },
  itemBlockRightSpacer: {
    marginRight: 4
  },
  sliderContainer: {
    flex: 1,
    marginHorizontal: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 9
  },

  // 4. set alarm sound
  alarmSoundContainer: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 16
  },
  alarmSoundLabel: {
    marginBottom: 16,
    color: color.gray["700"],
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    lineHeight: font.body["1"].height,
  },

  alarmSoundItemContainer: {
    width: 317,

    paddingHorizontal: 3,
    paddingVertical: 3,

    borderRadius: 8,
    backgroundColor: "white",
  },
  alarmSoundItem: {
    height: 54,

    paddingHorizontal: 13,
    paddingVertical: 13,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  alarmSoundItemBorderBottom: {
    borderBottomWidth: 1,
    borderColor: color.gray["100"],
  },

  // 5. set location
  locationContainer: {},
});
