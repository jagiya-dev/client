import Text from "@/components/Text";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Button } from "@/components/button";
import { CloseIcon } from "@/components/Icon";
import AlarmLocationItem from "@/components/alarm/Alarm.LocationItem";
import { useObservableState } from "@/hook/useObservableState";
import { alarmModelSubject } from "@/state/alarm/alarm.state";
// import { useObservableState } from "@/hook/useObservableState";

const AlarmDetailScreen = () => {
  const alarms = useObservableState({
    observable: alarmModelSubject
  });

  const onPressButton_ExitAlarmDetailScreen = () => {
    console.log("onPressButton_ExitAlarmDetailScreen");
  };

  return (
    <SafeAreaView style={s.root}>
      {/* 1. header */}
      <View style={s.header}>
        <Button
          style={s.headerExitButton}
          onPress={onPressButton_ExitAlarmDetailScreen}
        >
          <CloseIcon/>
        </Button>
      </View>

      {/* 2. top texts */}
      <View style={s.topContainer}>
        <Text style={s.topText1}>아 맞다, 우산!</Text>
        <Text style={s.topText2}>내가 설정한 지역 중에 비가 오는 곳이 있어요.</Text>
      </View>

      {/* 3. locations */}

      {/*{!!alarms &&*/}
      {/*  alarms.length > 0 &&*/}
      {/*    <FlatList*/}
      {/*        data={alarms.map((alarm) => ({*/}
      {/*          ...alarm.weathers,*/}
      {/*          isEnabled: alarm.isEnabled,*/}
      {/*          bHasIcon: false,*/}
      {/*        }))}*/}
      {/*        renderItem={(data) => (*/}
      {/*          <AlarmLocationItem key={data.index} {...data.item} />*/}
      {/*        )}*/}
      {/*        horizontal*/}
      {/*        showsHorizontalScrollIndicator={false}*/}
      {/*    />*/}
      {/*}*/}

    </SafeAreaView>
  );
};

export default AlarmDetailScreen;

const s = StyleSheet.create({
  root: {},

  header: {
    flexDirection: "row-reverse",
    paddingVertical: 21,
    paddingHorizontal: 14,
  },
  headerExitButton: {},
  headerExitIcon: {},

  topContainer: {},
  topText1: {},
  topText2: {}
});
