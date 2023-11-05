import Text from "@/components/Text";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button } from "@/components/button";
import { CloseIcon } from "@/components/Icon";
import { useCallback, useState } from "react";
import { font } from "@/styles/font";
import { color } from "@/styles/color";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@/typing";
import {
  AlarmLocationWeatherDetailResponse,
  getAlarmLocationWeatherDetail,
} from "@/network/api";
import { useQuestHasLoginHistory } from "@/hook/useQuestHasLoginHistory";
import LocationItem from "@/components/location/LocationItem";
import { useFocusEffect } from "@react-navigation/native";

type ScreenProps = NativeStackScreenProps<StackParamList, "AlarmDetail">;
const AlarmDetailScreen = ({ route, navigation }: ScreenProps) => {
  const { params } = route;
  const alarmId = params?.alarmId ?? "77";

  useQuestHasLoginHistory();

  const [alarmLocationDetails, setAlarmLocationDetails] =
    useState<readonly AlarmLocationWeatherDetailResponse[]>();

  // console.log("alarmDetail", JSON.stringify(alarmLocationDetails, null, 2));

  const [selectedLocation, setSelectedLocation] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      let alreadyFetched = false;
      async function refetchFromEditAlarm() {
        const response = await getAlarmLocationWeatherDetail({
          alarmId,
        });

        console.log(
          "refetch from AlarmDetailScreen",
          JSON.stringify(response, null, 2),
        );

        const { data } = response;

        if (alreadyFetched) return;

        setAlarmLocationDetails(data);

        // const soundVolume = data?.volume ?? 0.5;

        // get sound
        // get sound volume
        // play sound alarm
        // with message.

        // soundVolumeBehaviours.setSoundVolume(soundVolume);
        // reminderBehaviours.setReminderDirectly(Number(data?.reminder) ?? 0);
        // soundBehaviours.selectSound(
        //   data?.alarmSoundId?.toString() ?? "0",
        //   soundVolume,
        // );
        // repeatBehaviours.setRepeat(data?.alarmWeek ?? []);
      }

      refetchFromEditAlarm();

      return () => {
        alreadyFetched = true;
      };
    }, []),
  );

  const onPressButton_ExitAlarmDetailScreen = () => {
    // TODO: Dispose Resources.
    navigation.navigate("Main");
  };

  return (
    <SafeAreaView style={s.root}>
      {/* 1. header */}
      <View style={s.header}>
        <Button onPress={onPressButton_ExitAlarmDetailScreen}>
          <CloseIcon />
        </Button>
      </View>

      {/* 2. top texts */}
      <View style={s.topContainer}>
        <Text style={s.topText1}>
          아 맞다, <Text style={[s.topText1, s.topText1Inner]}>우산!</Text>
        </Text>
        <Text style={s.topText2}>
          내가 설정한 지역 중에 비가 오는 곳이 있어요.
        </Text>
      </View>

      {/* 3. locations */}
      <View style={s.locationContainer}>
        {alarmLocationDetails &&
          alarmLocationDetails.length > 0 &&
          alarmLocationDetails.map((data, i) => (
            <LocationItem
              key={i}
              eupMyun={data.eupMyun}
              isSelected={selectedLocation === i}
              selectLocation={() => {
                console.log("selectLocation", i);
                setSelectedLocation(i);
              }}
            />
          ))}
      </View>

      {/* 4. Times */}
      <View style={s.timeContainer}>
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {alarmLocationDetails &&
            alarmLocationDetails.length > 0 &&
            alarmLocationDetails.map((data, i) => {
              if (i !== selectedLocation) return null;

              return data.alarmLocationWeatherList?.map((time, j) => {
                const timeString =
                  time.locationTime?.substring(0, 2) +
                  ":" +
                  time.locationTime?.substring(2, 4);

                return (
                  <View style={s.timeItemContainer} key={j}>
                    <View style={s.timeItem}>
                      <Text style={s.timeItemText}>{timeString}</Text>
                      <Text style={s.timeItemTextDate}>{time.timeOfDay}</Text>
                    </View>

                    {time.rain && (
                      <Image source={require("#/icons/detail_rain.png")} />
                    )}
                  </View>
                );
              });
            })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AlarmDetailScreen;

const s = StyleSheet.create({
  root: {
    backgroundColor: color.gray["100"],
    flex: 1,
  },

  // 1. header
  header: {
    flexDirection: "row-reverse",
    marginVertical: 21,
    marginHorizontal: 14,
  },

  // 2. top texts
  topContainer: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  topText1: {
    fontSize: font.headline["2"].size,
    fontWeight: font.headline["2"].weight,
    lineHeight: font.headline["2"].height,
  },
  topText1Inner: {
    color: color.primary["600"],
  },
  topText2: {
    fontSize: font.body["3"].size,
    fontWeight: font.body["3"].weight,
    lineHeight: font.body["3"].height,
  },

  // 3. location
  locationContainer: {
    marginLeft: 20,
    flexDirection: "row",
  },

  // 4. time view
  timeContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 32,
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 20,
  },
  timeItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.gray["100"],
  },
  timeItem: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 8,
  },
  timeItemText: {
    color: color.gray["600"],
    fontSize: font.display["1"].size,
    fontWeight: font.display["1"].weight,
    lineHeight: font.display["1"].height,
    marginRight: 4,
  },
  timeItemTextDate: {
    color: color.gray["400"],
    fontSize: font.body["5"].size,
    fontWeight: font.body["5"].weight,
    lineHeight: font.body["5"].height,
  },
  timeItemWeatherIcon: {},
});
