import Text from "@/components/Text";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View
} from "react-native";
import { Button } from "@/components/button";
import { CloseIcon } from "@/components/Icon";
import { useObservableState } from "@/hook/useObservableState";
import { whenAlarmModel } from "@/state/alarm/alarm.state";
import { useMemo } from "react";
import LocationItem from "@/components/location/LocationItem";
import { font } from "@/styles/font";
import { color } from "@/styles/color";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@/typing";

type ScreenProps = NativeStackScreenProps<StackParamList, "AlarmDetail">;
const AlarmDetailScreen = ({ route, navigation }: ScreenProps) => {
  const alarms = useObservableState({
    observable: whenAlarmModel
  });

  const onPressButton_ExitAlarmDetailScreen = () => {
    console.log("onPressButton_ExitAlarmDetailScreen");
    navigation.navigate("Main");
  };

  const weathers = useMemo(() =>
      alarms
        ?.flatMap((alarm) => alarm.weathers)
        .slice(0, alarms.length),
    [ alarms ]
  );

  return (
    <SafeAreaView style={s.root}>
      {/* 1. header */}
      <View style={s.header}>
        <Button onPress={onPressButton_ExitAlarmDetailScreen}>
          <CloseIcon/>
        </Button>
      </View>

      {/* 2. top texts */}
      <View style={s.topContainer}>
        <Text style={s.topText1}>아 맞다, 우산!</Text>
        <Text style={s.topText2}>내가 설정한 지역 중에 비가 오는 곳이 있어요.</Text>
      </View>

      {/* 3. locations */}
      <View style={s.locationContainer}>
        {!!weathers &&
          weathers.length > 0 &&
            <FlatList
                data={weathers.map((weather) => ({
                  location: weather.location,
                  isSelected: false
                }))}
                renderItem={(data) => (
                  <LocationItem key={data.index} {...data.item} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        }
      </View>

      {/* 4. Times */}
      <View style={s.timeContainer}>
        <FlatList
          data={alarms}
          renderItem={(data) => (
            <View style={s.timeItemContainer} key={data.item.id}>
              <View style={s.timeItem}>
                <Text style={s.timeItemText}>{data.item.time}</Text>
                <Text style={s.timeItemTextDate}>{data.item.dateOfTime}</Text>
              </View>
            </View>
          )}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default AlarmDetailScreen;

const s = StyleSheet.create({
  root: {
    backgroundColor: color.gray["100"],
    flex: 1
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
    marginBottom: 32
  },
  topText1: {
    fontSize: font.headline["2"].size,
    fontWeight: font.headline["2"].weight,
    lineHeight: font.headline["2"].height,
  },
  topText2: {
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    lineHeight: font.body["1"].height,
  },

  // 3. location
  locationContainer: {
    marginLeft: 20,
  },
  locationItem: {},

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
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 16
  },
  timeItem: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 8
  },
  timeItemText: {
    color: color.gray["600"],
    fontSize: font.display["1"].size,
    fontWeight: font.display["1"].weight,
    lineHeight: font.display["1"].height,
  },
  timeItemTextDate: {
    color: color.gray["400"],
    fontSize: font.body["5"].size,
    fontWeight: font.body["5"].weight,
    lineHeight: font.body["5"].height,
  },
  timeItemWeatherIcon: {},
});
