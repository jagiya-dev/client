import {
  Modal,
  Platform,
  StyleSheet,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@/typing";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { BellIcon } from "@/components/Icon";
import Text from "@/components/Text";
import { useObservableState } from "@/hook/useObservableState";
import {
  alarmDeferCountdown$,
  initialTimeAsStr
} from "@/state/alarmDefer/alarmDefer.state";

type Props = {
  visible: boolean;
  setDeferred: (isEnabled: boolean) => void;
  navigation: NativeStackScreenProps<StackParamList, "ActivatedAlarm">["navigation"];
};

const AlarmDeferModal = ({ visible, setDeferred, navigation }: Props) => {
  const time = useObservableState({ observable: alarmDeferCountdown$ }) ?? initialTimeAsStr;

  const onPressButton_closeAlarmOnDeferModal = () => {
    console.log("onPressButton_closeAlarm on defer modal");
    setDeferred(false);
    navigation.navigate("AlarmDetail");
  };

  return <Modal
    transparent
    statusBarTranslucent
    animationType="slide"
    visible={visible}
    presentationStyle="overFullScreen"
  >
    <SafeAreaView style={s.deferModalRoot}>
      <View style={s.modalSpacer}/>

      <View style={s.delayTimeContainer}>
        <BellIcon/>
        <Text style={s.delayTimeText}>{time}</Text>
      </View>

      <View style={s.closeContainer}>
        <Button style={s.closeButton}
                onPress={onPressButton_closeAlarmOnDeferModal}>
          <Text style={s.closeButtonText}>이미 우산을 챙겼어요</Text>
        </Button>

      </View>
    </SafeAreaView>
  </Modal>;
};
export default AlarmDeferModal;

const s = StyleSheet.create({
  deferModalRoot: {
    backgroundColor: color.gray["600"],
    opacity: 0.8,
    flex: 1,
    width: widthPercentageToDP("100%"),
    alignItems: "center",
  },

  modalSpacer: {
    ...Platform.select({
      ios: {
        marginTop: 565
      },
      android: {
        marginTop: 506
      }
    })
  },

  delayTimeContainer: {
    flexDirection: "row",
    height: 40,
    marginBottom: 24,
  },
  delayTimeText: {
    marginLeft: 4,
    color: "white",
    fontSize: font.display["1"].size,
    fontWeight: font.display["1"].weight,
    lineHeight: font.display["1"].height,
  },

  // 4. bottom actions
  closeContainer: {
    paddingHorizontal: 50,
  },
  closeButton: {
    backgroundColor: color.primary["600"],
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 99,
    alignItems: "center",
    width: 290
  },
  closeButtonText: {
    color: "white",
    fontSize: font.title["2"].size,
    fontWeight: font.title["2"].weight,
    lineHeight: font.title["2"].height,
  },
});
