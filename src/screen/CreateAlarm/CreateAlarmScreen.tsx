import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { useInitNotification } from "@/util/notification/useInitNotification";
import { useHandleForegroundNotification } from "@/util/notification/useHandleForegroundNotification";
import Text from "@/components/Text";
import {
  CloseIcon,
  RightArrowIcon,
  SoundVolumeIcon,
  VibrationIcon,
} from "@/components/Icon";
import { useMemo, useState } from "react";
import DatePicker from "react-native-date-picker";
import { color } from "@/styles/color";
import { Shadow } from "react-native-shadow-2";
import { font } from "@/styles/font";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Slider } from "@miblanchard/react-native-slider";
import { SliderOnChangeCallback } from "@miblanchard/react-native-slider/lib/types";
import { useObservableState } from "@/hook/useObservableState";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@/typing";
import BottomSheet, {
  EBottomSheetOpenState,
} from "@/components/bottom-sheet/BottomSheet";
import RepeatContainer from "@/screen/CreateAlarm/Repeat/RepeatContainer";
import AlarmSoundContainer from "@/screen/CreateAlarm/AlarmSound/AlarmSoundContainer";
import ReminderContainer from "@/screen/CreateAlarm/Reminder/ReminderContainer";
import {
  behaviours,
  whenSoundVolumeChange,
} from "@/state/sound/soundVolume.state";
import BottomButton from "@/components/fixed/BottomButton";
import { insertAlarm } from "@/network/api";
import { whenRepeatDaysAbbreviated } from "@/state/repeat/repeat.state";
import { whenSelectedSoundChange } from "@/state/sound/sound.state";
import { soundNameAsLabel } from "@/audio";
import { whenSelectedReminderChange } from "@/screen/CreateAlarm/Reminder/reminder.state";
import { navRef } from "@/navigation";
import CreateAlarmDialog from "@/components/dialog/CreateAlarm.Dialog";

type ScreenProps = NativeStackScreenProps<StackParamList, "CreateAlarm">;

const CreateAlarmScreen = ({ route, navigation }: ScreenProps) => {
  const [isCreateAlarmDialogOpen, setIsCreateAlarmDialogOpen] = useState<
    boolean | undefined
  >(undefined);

  const openCreateAlarmDialog = () => setIsCreateAlarmDialogOpen(true);
  const closeCreateAlarmDialog = () => setIsCreateAlarmDialogOpen(false);

  const onPressButton_createAlarmOK = () => {
    closeCreateAlarmDialog();

    if (navRef.canGoBack()) {
      navRef.goBack();
    }
  };

  const onPressButton_createAlarmOKCancel = () => {
    closeCreateAlarmDialog();
  };

  const [alarmDate, setAlarmDate] = useState<Date>(new Date());

  const alarmHours = useMemo(
    () => alarmDate.getHours().toString().padStart(2, "0"),
    [alarmDate],
  );

  const alarmMinutes = useMemo(
    () => alarmDate.getMinutes().toString().padStart(2, "0"),
    [alarmDate],
  );

  const alarmAMPM = useMemo(
    () => (alarmDate.getHours() >= 12 ? "pm" : "am"),
    [alarmDate],
  );

  const [regionNames, setRegionNames] = useState<string[]>([]);

  const [repeatBottomSheetState, setRepeatBottomSheetState] =
    useState<EBottomSheetOpenState>(EBottomSheetOpenState.CLOSE);

  const [reminderBottomSheetState, setReminderBottomSheetState] =
    useState<EBottomSheetOpenState>(EBottomSheetOpenState.CLOSE);

  const [alarmSoundBottomSheetState, setAlarmSoundBottomSheetState] =
    useState<EBottomSheetOpenState>(EBottomSheetOpenState.CLOSE);

  const repeatDaysAbbreviated = useObservableState({
    observable: whenRepeatDaysAbbreviated,
  });

  const soundVolume = useObservableState({
    observable: whenSoundVolumeChange,
  });

  const selectedSound = useObservableState({
    observable: whenSelectedSoundChange,
  });

  const reminderState = useObservableState({
    observable: whenSelectedReminderChange,
  });

  const onChangeSliderValue: SliderOnChangeCallback = (value) => {
    if (isNaN(value[0])) return;

    const volume = Number(value[0].toFixed(2));
    behaviours.setSoundVolume(volume);
  };

  useHandleForegroundNotification();

  const loading = useInitNotification();
  if (loading) {
    return null;
  }

  const onPressButton_deleteRegion = (index: number) => {
    setRegionNames((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };

  const onPressButton_AddNewRegion = () => {
    navigation.navigate("AddRegion");
  };

  const onPressButton_SaveAndSetNewNotification = async () => {
    console.log("Save and set new notification");

    // todo: set a new notification.
    try {
      const params = {
        timeOfDay: alarmAMPM,
        alarmTime: alarmHours + alarmMinutes,
        alarmLocationList: [],
        volume: soundVolume,
        vibration: soundVolume === 0 ? 1 : 0,
        weekList: [],
        reminder: (reminderState?.minute ?? 0).toString(),
        // alarmSoundId: selectedSound,
      };
      console.log("insert alarm: ", params);
      const response = await insertAlarm(params);

      const { data } = response;
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  const onPress_openRepeatBottomSheet = () => {
    if (
      reminderBottomSheetState === EBottomSheetOpenState.OPEN ||
      alarmSoundBottomSheetState === EBottomSheetOpenState.OPEN
    )
      return;

    setRepeatBottomSheetState(EBottomSheetOpenState.OPEN);
  };

  const onPress_openReminderBottomSheet = () => {
    if (
      repeatBottomSheetState === EBottomSheetOpenState.OPEN ||
      alarmSoundBottomSheetState === EBottomSheetOpenState.OPEN
    )
      return;

    setReminderBottomSheetState(EBottomSheetOpenState.OPEN);
  };

  const onPress_openAlarmSoundBottomSheet = () => {
    setAlarmSoundBottomSheetState(EBottomSheetOpenState.OPEN);
  };

  return (
    <SafeAreaView style={s.root}>
      {/* 0. header */}
      <View style={s.header}>
        <Text style={s.headerTitle}>알람 설정</Text>

        <TouchableOpacity
          onPress={() => openCreateAlarmDialog()}
          style={s.headerCloseIconButton}
        >
          <Image
            source={require("#/icons/close.png")}
            style={s.headerCloseIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={s.scrollRoot}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* 1. timepicker */}
        <View style={s.timePickerContainer}>
          <DatePicker
            date={alarmDate}
            onDateChange={setAlarmDate}
            mode="time"
          />
        </View>

        {/* 2. set repeat */}
        <Shadow
          offset={[0, 2]}
          distance={2}
          startColor="rgba(0, 0, 0, 0.1)"
          style={s.itemBlockShadow}
          stretch
        >
          <TouchableNativeFeedback
            style={s.itemBlockTouchable}
            onPress={onPress_openRepeatBottomSheet}
          >
            <View style={s.itemBlockContainer}>
              <Text style={s.itemBlockLabel}>반복</Text>

              <View style={s.itemBlockRight}>
                <Text style={s.itemBlockLabel}>
                  {repeatDaysAbbreviated ?? "-"}
                </Text>
                <View style={s.itemBlockRightSpacer} />
                <RightArrowIcon style={s.itemBlockIcon} />
              </View>
            </View>
          </TouchableNativeFeedback>
        </Shadow>

        {/* 3. set alarm sound */}
        <View style={s.alarmSoundContainer}>
          <Text style={s.alarmSoundLabel}>어떤 소리로 알려드릴까요?</Text>

          <Shadow
            offset={[0, 2]}
            distance={2}
            startColor="rgba(0, 0, 0, 0.1)"
            style={s.itemBlockShadow}
            stretch
          >
            <View style={s.alarmSoundItemContainer}>
              <TouchableNativeFeedback
                style={s.itemBlockTouchable}
                onPress={onPress_openAlarmSoundBottomSheet}
              >
                <View style={[s.alarmSoundItem, s.alarmSoundItemBorderBottom]}>
                  <Text style={s.itemBlockLabel}>사운드</Text>

                  <View style={s.itemBlockRight}>
                    <Text style={s.itemBlockLabel}>
                      {selectedSound
                        ? soundNameAsLabel(selectedSound)
                        : "기본알람"}
                    </Text>
                    <View style={s.itemBlockRightSpacer} />
                    <RightArrowIcon style={s.itemBlockIcon} />
                  </View>
                </View>
              </TouchableNativeFeedback>

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
                          elevation: 3,
                        },
                        ios: {
                          shadowRadius: 3,
                          shadowOpacity: 0.2,
                          shadowOffset: {
                            width: 1,
                            height: 3,
                          },
                        },
                      }),
                    }}
                    minimumTrackTintColor={color.primary["600"]}
                  />
                </View>
                <VibrationIcon />
              </View>

              <TouchableNativeFeedback
                style={s.itemBlockTouchable}
                onPress={onPress_openReminderBottomSheet}
              >
                <View style={s.alarmSoundItem}>
                  <Text style={s.itemBlockLabel}>다시알림</Text>

                  <View style={s.itemBlockRight}>
                    <Text style={s.itemBlockLabel}>
                      {reminderState ? reminderState.minute + "분" : "-"}
                    </Text>
                    <View style={s.itemBlockRightSpacer} />
                    <RightArrowIcon style={s.itemBlockIcon} />
                  </View>
                </View>
              </TouchableNativeFeedback>
            </View>
          </Shadow>
        </View>

        {/* 4. set location label */}
        <View style={s.regionContainer}>
          <Text style={s.regionLabel}>JAGIYA님이</Text>
          <Text style={s.regionLabel}>활동하는 지역들을 추가해주세요.</Text>
          <Text style={s.regionSublabel}>
            (지역은 최대 4개까지 추가할 수 있어요)
          </Text>
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
              stretch
            >
              <View style={s.regionItem}>
                <Text style={s.itemBlockLabel}>{name}</Text>

                <View style={s.itemBlockRight}>
                  <View style={s.regionItemRightSpacer} />
                  <CloseIcon
                    style={s.itemBlockIcon}
                    useTouch
                    onPress={() => onPressButton_deleteRegion(i)}
                  />
                </View>
              </View>
            </Shadow>
          ))}

          {/* 4-3. add new bottom-sheet */}
          <Shadow
            offset={[0, 2]}
            distance={2}
            startColor="rgba(0, 0, 0, 0.1)"
            style={s.itemBlockShadow}
            stretch
          >
            <TouchableNativeFeedback
              onPress={onPressButton_AddNewRegion}
              style={s.regionItemInside}
            >
              <View style={[s.regionItem, s.regionAddItem]}>
                <Text style={s.regionAddItemLabel}>지역 추가</Text>
                <View style={s.regionAddItemButton}>
                  <Image
                    source={require("#/icons/plus.png")}
                    style={s.regionAddItemIcon}
                  />
                </View>
              </View>
            </TouchableNativeFeedback>
          </Shadow>
        </View>
      </ScrollView>

      <BottomButton
        onPress={onPressButton_SaveAndSetNewNotification}
        text="확인"
      />

      {/* 반복 바텀시트 */}
      {repeatBottomSheetState === EBottomSheetOpenState.OPEN && (
        <BottomSheet
          bOpen={repeatBottomSheetState}
          setIsOpen={setRepeatBottomSheetState}
          height={80}
        >
          <RepeatContainer />
        </BottomSheet>
      )}

      {/* 알람 사운드 바텀시트 */}
      {alarmSoundBottomSheetState === EBottomSheetOpenState.OPEN && (
        <BottomSheet
          bOpen={alarmSoundBottomSheetState}
          setIsOpen={setAlarmSoundBottomSheetState}
        >
          <AlarmSoundContainer />
        </BottomSheet>
      )}

      {/* 다시 알림 바텀시트 */}
      {reminderBottomSheetState === EBottomSheetOpenState.OPEN && (
        <BottomSheet
          bOpen={reminderBottomSheetState}
          setIsOpen={setReminderBottomSheetState}
          height={60}
        >
          <ReminderContainer />
        </BottomSheet>
      )}

      <CreateAlarmDialog
        onPressOk={onPressButton_createAlarmOK}
        onPressCancel={onPressButton_createAlarmOKCancel}
        isOpen={isCreateAlarmDialogOpen ?? false}
      />
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

  header: {
    position: "relative",

    height: 70,
    // paddingVertical: 20,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    lineHeight: font.body["1"].height,
  },
  headerCloseIconButton: {
    width: 30,
    height: 30,
    zIndex: 10,
    position: "absolute",
    top: 20,
    bottom: 0,
    right: -140,
  },
  headerCloseIcon: {
    width: 30,
    height: 30,
  },

  scrollRoot: {
    alignItems: "center",
    paddingHorizontal: 20,
    ...Platform.select({
      android: {
        paddingBottom: 82 + 60,
      },
      ios: {
        paddingBottom: 82,
      },
    }),
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
      },
    }),
  },
  itemBlockTouchable: {
    borderRadius: 8,
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
    tintColor: color.gray["400"],
  },
  itemBlockRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemBlockRightSpacer: {
    marginRight: 4,
  },
  sliderContainer: {
    flex: 1,
    marginHorizontal: "auto",
    paddingHorizontal: 16,
    paddingVertical: 9,
  },

  // 4. set alarm sound
  alarmSoundContainer: {
    marginTop: 16,
    paddingVertical: 16,
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
    // flex: 1,
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  regionItem: {
    width: 136,
    height: 54,

    paddingHorizontal: 16,
    paddingVertical: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderRadius: 8,
    backgroundColor: "white",
  },
  regionItemInside: {
    borderRadius: 8,
  },
  regionItemRightSpacer: {
    marginRight: 16,
  },
  regionAddItem: {
    backgroundColor: color.primary["100"],
  },
  regionAddItemLabel: {
    color: color.primary["600"],
    fontSize: font.body["2"].size,
    fontWeight: font.body["2"].weight,
    lineHeight: font.body["2"].height,
    marginRight: 14,
  },
  regionAddItemButton: {
    backgroundColor: color.primary["400"],
    borderRadius: 99,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  regionAddItemIcon: {
    width: 18,
    height: 18,
    tintColor: "white",
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
      },
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
  },
});
