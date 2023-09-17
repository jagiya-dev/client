import {
  Modal,
  ModalProps,
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/button";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@/typing";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { color } from "@/styles/color";
import { font } from "@/styles/font";

type Props = {
  visible: boolean;
  setDeferred: (isEnabled: boolean) => void;
  navigation: NativeStackScreenProps<StackParamList, "ActivatedAlarm">["navigation"];
};

const AlarmDeferModal = ({ visible, setDeferred, navigation }: Props) => {
  const onPressButton_closeAlarmOnDeferModal = () => {
    console.log("onPressButton_closeAlarm on defer modal");
    setDeferred(false);
    navigation.navigate("AlarmDetail");
  };

  const onPressButton_deferAlarmOnDeferModal = () => {
    console.log("onPressButton_deferAlarm on defer modal");
    // todo : notify later.

    setDeferred(false);
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

      <View style={s.bottomContainer}>
        <Button style={s.closeButton}
                onPress={onPressButton_closeAlarmOnDeferModal}>
          <Text style={s.closeButtonText}>이미 우산을 챙겼어요</Text>
        </Button>

        <Button style={s.deferButton}
                onPress={onPressButton_deferAlarmOnDeferModal}>
          <Text style={s.deferButtonText}>5분 후 다시 알림</Text>
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

  // 4. bottom actions
  bottomContainer: {
    paddingHorizontal: 50,
    marginTop: 35.5
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
  deferButton: {
    width: 290,
    alignItems: "center",
    marginTop: 32
  },
  deferButtonText: {
    color: color.primary["600"],
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    lineHeight: font.body["1"].height,
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
  }
});
