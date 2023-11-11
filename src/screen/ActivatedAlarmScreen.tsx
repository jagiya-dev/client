import { Button } from "@/components/button";
import { ESoundName, StackParamList } from "@/typing";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { useCallback, useMemo, useState } from "react";
import AlarmDeferModal from "@/components/alarm/AlarmDeferModal";
import { startCountdown } from "@/state/alarmDefer/alarmDefer.state";
import { useFocusEffect } from "@react-navigation/native";
import { AlarmDetailResponse, getAlarmDetail } from "@/network/api";
import { soundResourcesMap } from "@/audio";

type PageProps = NativeStackScreenProps<StackParamList, "ActivatedAlarm">;

const ActivatedAlarmScreen = ({ route, navigation }: PageProps) => {
  const { params } = route;
  const alarmId = params?.alarmId ?? undefined;

  const [isDeferred, setDeferred] = useState<boolean>(false);
  const [alarmDetail, setAlarmDetail] = useState<AlarmDetailResponse>();

  const locationString = useMemo(() => {
    const locations = alarmDetail?.alarmLocation;
    if (!locations || locations.length === 0) return "";

    const length = locations.length;
    const firstLocation = locations[0].eupMyun + " " + locations[0].guGun;

    if (length === 1) return firstLocation;
    return `${firstLocation} 외 ${length - 1}곳`;
  }, [alarmDetail]);

  const timeString = useMemo(() => {
    let alarmTime = alarmDetail?.alarmTime ?? "";
    if (alarmTime) {
      alarmTime =
        alarmTime.substring(0, 2) + ":" + alarmTime.substring(2, 4) + "시";
    }

    let alarmTimeOfDay = alarmDetail?.timeOfDay;
    alarmTimeOfDay = alarmTimeOfDay?.toLowerCase() === "AM" ? "오전" : "오후";

    return `${alarmTimeOfDay} ${alarmTime}`;
  }, [alarmDetail]);

  // play alarm sound

  useFocusEffect(
    useCallback(() => {
      let alreadyFetched = false;

      const fetchCurrentAlarmInfo = async () => {
        try {
          const { data } = await getAlarmDetail({ alarmId });
          if (!data) return;

          if (!alreadyFetched) {
            console.log(
              "Activated Alarm Screen: ",
              JSON.stringify(data, null, 2),
            );
            setAlarmDetail(data);
          }
        } catch (err) {
          console.error(err);
        }
      };

      fetchCurrentAlarmInfo();

      return () => {
        alreadyFetched = true;
      };
    }, [alarmId]),
  );

  useFocusEffect(
    useCallback(() => {
      if (!alarmDetail) return;
      const alarmSoundId: number = alarmDetail.alarmSoundId ?? 0;

      const soundToPlayId = Object.values(ESoundName).find(
        (_, i) => i === alarmSoundId,
      );
      if (!soundToPlayId) return;

      console.log(`sound To Play: ${soundToPlayId as ESoundName}`);

      const soundToPlay = soundResourcesMap.get(soundToPlayId as ESoundName);

      if (!soundToPlay?.isLoaded()) {
        console.log(`${soundToPlay} is not loaded yet`);
        return;
      }

      const soundVolume = (alarmDetail.volume ?? 5) / 10;
      console.log(`sound volume: ${soundVolume}`);

      soundToPlay?.setVolume(soundVolume);
      soundToPlay?.play((success) => {
        if (success) {
          console.log(`successfully played the sound ${soundToPlayId}`);
          return;
        }

        console.log(
          `playback failed due to audio decoding errors: ${soundToPlayId}`,
        );
      });
    }, [alarmDetail]),
  );

  const onPressButton_closeAlarm = () => {
    navigation.navigate("AlarmDetail", {
      alarmIds: [Number(alarmId)],
    });
  };

  const onPressButton_deferAlarm = () => {
    console.log("onPressButton_deferAlarm");
    // todo : notify later.

    setDeferred(true);
    startCountdown();
  };

  return (
    <>
      <AlarmDeferModal
        visible={isDeferred}
        setDeferred={(isEnabled: boolean) => setDeferred(isEnabled)}
        navigation={navigation}
      />

      <SafeAreaView style={s.root}>
        {/* 1. Indicator Phrases */}
        <View style={s.topContainer}>
          <Text style={s.topLocationText}>{locationString}</Text>
          <Text style={s.topWeatherText}>
            <Text style={s.topTimeText}>{timeString}</Text>에 비 예보가 있어요.
          </Text>
        </View>

        {/* 2. Gadget Texts */}
        <View style={s.gadgetContainer}>
          <Text style={s.gadgetText}>우산</Text>
          <Text style={s.gadgetLabel}>을 꼭 챙겨주세요!</Text>
        </View>

        {/* 3. Gadget Image */}
        <View style={s.weatherImageContainer}>
          <Image
            source={require("#/images/umbrella.png")}
            style={s.weatherImage}
          />
          <Image source={require("#/images/rains.png")} style={s.rainImage} />
        </View>

        {/* 4. Bottom Actions */}
        {!isDeferred && (
          <View style={s.bottomContainer}>
            <Button style={s.closeButton} onPress={onPressButton_closeAlarm}>
              <Text style={s.closeButtonText}>이미 우산을 챙겼어요</Text>
            </Button>

            <Button style={s.deferButton} onPress={onPressButton_deferAlarm}>
              <Text style={s.deferButtonText}>5분 후 다시 알림</Text>
            </Button>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default ActivatedAlarmScreen;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: widthPercentageToDP("100%"),
    alignItems: "center",
  },

  // 1. indicator phrases
  topContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  topLocationText: {
    color: color.gray["700"],
    fontSize: font.headline["2"].size,
    fontWeight: font.headline["2"].weight,
    lineHeight: font.headline["2"].height,
  },
  topWeatherText: {
    color: color.gray["700"],
    fontSize: font.body["2"].size,
    fontWeight: font.body["2"].weight,
    lineHeight: font.body["2"].height,
  },
  topTimeText: {
    color: color.sub["500"],
  },

  // 2. gadget texts
  gadgetContainer: {
    alignItems: "flex-end",
    flexDirection: "row",
    marginTop: 32,
  },
  gadgetText: {
    color: color.primary["600"],
    fontSize: font.display["2"].size,
    fontWeight: font.display["2"].weight,
    lineHeight: font.display["2"].height,
  },
  gadgetLabel: {
    marginLeft: 2,
    color: color.gray["700"],
    fontSize: font.headline["1"].size,
    fontWeight: font.headline["1"].weight,
    lineHeight: font.headline["1"].height,
  },

  // 3. weather image
  weatherImageContainer: {
    marginTop: 21,
    position: "relative",
  },
  weatherImage: {
    width: 274.883,
    height: 304.739,
  },
  rainImage: {
    width: 274.883,
    height: 304.739,
    position: "absolute",
    top: 0,
    zIndex: -1,
  },

  // 4. bottom actions
  bottomContainer: {
    paddingHorizontal: 50,
    marginTop: 35.5,
  },
  closeButton: {
    backgroundColor: color.primary["600"],
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 99,
    alignItems: "center",
    width: 290,
  },
  closeButtonText: {
    color: "white",
    fontSize: font.title["2"].size,
    fontWeight: font.title["2"].weight,
    lineHeight: font.title["2"].height,
  },
  deferButton: {
    width: 290,
    alignItems: "center",
    marginTop: 32,
  },
  deferButtonText: {
    color: color.primary["600"],
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    lineHeight: font.body["1"].height,
  },
});
