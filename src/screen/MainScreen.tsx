import { Button } from "@/components/button";
import { RightArrowIcon } from "@/components/Icon";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AlarmContainer from "@/components/alarm/Alarm.Container";
import AddNewAlarmItemButton from "@/components/button/AddNewAlarmItem.button";
import { useInitNotification } from "@/util/notification/useInitNotification";
import { useHandleForegroundNotification } from "@/util/notification/useHandleForegroundNotification";
import { deleteModeToggleSubject } from "@/state/main/main.state";
import { useObservableState } from "@/hook/useObservableState";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { StackParamList } from "@/typing";
import Text from "@/components/Text";
import { alarmCount$, alarmList$, alarms } from "@/state/alarm/alarm.state";
import { headerStyles } from "@/components/Header";
import { AlarmResponse, getAlarmList } from "@/network/api";
import { local } from "@/state/auth/auth.state.local";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

type Props = NativeStackScreenProps<StackParamList, "Main">;

const MainScreen = ({ route, navigation }: Props) => {
  const alarmDataArr: readonly AlarmResponse[] =
    useObservableState({
      observable: alarmList$,
    }) ?? [];

  const isDeleteMode = useObservableState({
    observable: deleteModeToggleSubject,
  });

  const alarmCount = useObservableState({
    observable: alarmCount$,
  });

  let hasEnoughAlarm = true;

  if (!alarmCount) hasEnoughAlarm = false;
  if (alarmCount && alarmCount < 4) hasEnoughAlarm = false;

  useHandleForegroundNotification();

  useFocusEffect(
    useCallback(() => {
      async function loadFirst() {
        try {
          const response = await getAlarmList({
            userId: local.localAuthState.userId?.toString() ?? "",
          });

          if (response.data) {
            alarms.next(response.data);
          }
        } catch (err) {
          console.error(err);
        }
      }

      loadFirst();
    }, []),
  );

  const loading = useInitNotification();
  if (loading) {
    return null;
  }

  const onPressButton_goToSettings = () => {
    navigation.navigate("Settings");
  };

  const onPressButton_toggleDeleteMode = () => {
    deleteModeToggleSubject.next(!isDeleteMode);
  };

  const onPressButton_AddNewAlarmItem = () => {
    navigation.navigate("CreateAlarm");
  };

  const onPressButton_DetailButton = async () => {
    const alarmIds = alarmDataArr.map((alarm) => alarm.alarmId!);
    console.log(`going to AlarmDetail with `, alarmIds);

    navigation.navigate("AlarmDetail", {
      alarmIds,
    });
  };

  return (
    <SafeAreaView style={s.root}>
      <View style={s.innerRoot}>
        <View
          style={[
            headerStyles.headerContainer,
            headerStyles.headerSpaceBetween,
          ]}
        >
          <Text style={headerStyles.headerText}>레디우산</Text>

          <TouchableOpacity
            style={[headerStyles.headerClickable, headerStyles.headerIcon]}
            onPress={onPressButton_goToSettings}
          >
            <Image
              source={require("#/icons/setting.png")}
              style={headerStyles.headerIcon}
            />
          </TouchableOpacity>
        </View>

        {/* 2. conversation */}
        <View style={s.conversationContainer}>
          <Text style={s.conversationText}>오늘은 우산을 꼭 챙기세요!</Text>

          <Button style={s.detailButton} onPress={onPressButton_DetailButton}>
            <Text style={s.detailButtonText}>자세히 보기</Text>
            <RightArrowIcon />
          </Button>
        </View>

        {/* 3. Alarm Label */}
        <View style={s.alarmLabelContainer}>
          <Text style={s.alarmLabel}>My 알람</Text>
          <Button onPress={onPressButton_toggleDeleteMode}>
            <Text style={s.alarmToggleDeleteModeText}>
              {isDeleteMode ? "완료" : "삭제"}
            </Text>
          </Button>
        </View>
      </View>

      {/* 4. Alarm Scroll View */}
      <AlarmContainer alarmDataArr={alarmDataArr} />

      {/* 5. Add New Alarm Item Button and its additive shadow */}
      {!hasEnoughAlarm && (
        <AddNewAlarmItemButton
          style={s.addNewAlarmItemButton}
          onPress={onPressButton_AddNewAlarmItem}
        />
      )}
    </SafeAreaView>
  );
};

export default MainScreen;

const s = StyleSheet.create({
  root: {
    width: wp("100%"),
    flex: 1,
    position: "relative",
    backgroundColor: "white",
  },
  innerRoot: {
    paddingHorizontal: 20,
  },
  conversationContainer: {
    paddingBottom: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  conversationText: {
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    color: color.gray["700"],
  },
  detailButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: color.primary["600"],
    paddingLeft: 16,
    paddingRight: 10,
    paddingVertical: 8,
    borderRadius: 24,
  },
  detailButtonText: {
    color: "white",
    fontSize: font.button["2"].size,
    fontWeight: font.button["2"].weight,
    marginRight: 4,
  },
  alarmLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  alarmLabel: {
    fontSize: font.title["1"].size,
    fontWeight: font.title["1"].weight,
    color: color.gray["700"],
  },
  alarmToggleDeleteModeText: {
    fontSize: font.body["2"].size,
    fontWeight: font.body["2"].weight,
    color: color.primary["600"],
  },
  alarmContainerView: {
    marginTop: 16,
  },
  addNewAlarmItemButton: {
    position: "absolute",
    right: 15,
    bottom: 40,
  },
});
