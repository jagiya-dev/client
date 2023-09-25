import {
  Platform,
  SafeAreaView,
  ScrollView,
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
// import DeviceInfo from "react-native-device-info";
import { font } from "@/styles/font";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Slider } from "@miblanchard/react-native-slider";
import { SliderOnChangeCallback } from "@miblanchard/react-native-slider/lib/types";
import { useObservableState } from "@/hook/useObservableState";
import { whenSoundVolumeChange } from "@/state/sound/sound.state";
import { behaviours as soundBehaviours } from "@/state/sound/sound.state";
import { Button } from "@/components/button";

const regionNames = [
  "서울시",
  "부산시",
  "대구시",
  "인천시",
  "광주시",
  "대전시",
  "울산시",
  "세종시",
  "경기도",
  "강원도",
];

const CreateAlarmScreen = () => {
  const [date, setDate] = useState<Date>(new Date());

  const soundVolume = useObservableState({
    observable: whenSoundVolumeChange,
    subscribeFn(value) {
      console.log("sound volume changed to ", value);
    },
  });

  const onChangeSliderValue: SliderOnChangeCallback = (value) => {
    if (isNaN(value[0]))
      return;

    const volume = Number(value[0].toFixed(2));
    soundBehaviours.setSoundVolume(volume);
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
      <ScrollView
        contentContainerStyle={s.scrollRoot}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
      >
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

        {/* 4. set location label */}
        <View style={s.regionContainer}>
          <Text style={s.regionLabel}>JAGIYA님이</Text>
          <Text style={s.regionLabel}>활동하는 지역들을 추가해주세요.</Text>
          <Text style={s.regionSublabel}>(지역은 최대 4개까지 추가할 수 있어요)</Text>
        </View>

        {/* 4-2. set location */}
        <View style={s.regionItemContainer}>
          {regionNames.map((name, i) => (
            <Shadow
              key={i}
              offset={[0, 2]}
              distance={2}
              startColor="rgba(0, 0, 0, 0.1)"
              style={s.itemBlockShadow}
            >
              <View style={s.regionItem}>
                <Text style={s.itemBlockLabel}>
                  {name}
                </Text>

                <View style={s.itemBlockRight}>
                  <View style={s.regionItemRightSpacer} />
                  <CloseIcon style={s.itemBlockIcon} useTouch />
                </View>
              </View>
            </Shadow>)
          )}
        </View>
      </ScrollView>

      {/* 5. save */}
      <View style={s.saveContainer}>
        <Button style={s.saveButton}>
          <Text style={s.saveButtonInnerText}>완료</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default CreateAlarmScreen;

const s = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: color.gray["50"],
    position: "relative",
  },
  scrollRoot: {
    alignItems: "center",
    paddingHorizontal: 20,
  },

  // 1. timepicker
  timePickerContainer: {
    alignItems: "center",
    marginBottom: 14,
  },

  // 2. set repeat
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
  itemBlockLabel: {
    color: color.gray["700"],
    marginRight: 16,
  },
  itemBlockIcon: {
    width: 18,
    height: 18,
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
    // paddingHorizontal: 20,
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
  regionContainer: {
    paddingTop: 16,
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  regionLabel: {
    color: color.gray["700"],
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    lineHeight: font.body["1"].height,
  },
  regionSublabel: {
    marginTop: 4,
    color: color.gray["400"],
    fontSize: font.body["5"].size,
    fontWeight: font.body["5"].weight,
    lineHeight: font.body["5"].height,
  },
  regionItemContainer: {
    paddingTop: 16,
    gap: 12,
    paddingLeft: 20,
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  regionItem: {
    height: 54,

    paddingHorizontal: 16,
    paddingVertical: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0,

    borderRadius: 8,
    backgroundColor: "white",
  },
  regionItemRightSpacer: {
    marginRight: 16,
  },
  regionAddItem: {

  },

  // 5. save
  saveContainer: {
    width: widthPercentageToDP("100%"),
    height: 82,

    ...Platform.select({
      android: {
        bottom: 40,
      },
      ios: {
        bottom: 0,
      }
    }),
    backgroundColor: "white",
    zIndex: 10,

    position: "absolute",
    left: 0,
    right: 0,

    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  saveButton: {
    backgroundColor: color.primary["600"],
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 99,
    width: 290,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonInnerText: {
    color: "white",
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    lineHeight: font.body["1"].height,
  }
});
