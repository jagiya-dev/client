import { Button } from "@/components/button";
import { StackParamList } from "@/typing";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { useState } from "react";
import AlarmDeferModal from "@/components/alarm/AlarmDeferModal";

type PageProps = NativeStackScreenProps<StackParamList, "ActivatedAlarm">;

const ActivatedAlarmScreen = ({ route, navigation }: PageProps) => {
  const [ isDeferred, setDeferred ] = useState<boolean>(false);

  const onPressButton_closeAlarm = () => {
    navigation.navigate("AlarmDetail");
  };

  const onPressButton_deferAlarm = () => {
    console.log("onPressButton_deferAlarm");
    // todo : notify later.

    setDeferred(true);
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
          <Text style={s.topLocationText}>관악구 봉천동 외 3곳</Text>
          <Text style={s.topWeatherText}>
            <Text style={s.topTimeText}>오전</Text>
            에 비 예보가 있어요.
          </Text>
        </View>

        {/* 2. Gadget Texts */}
        <View style={s.gadgetContainer}>
          <Text style={s.gadgetText}>우산</Text>
          <Text style={s.gadgetLabel}>
            을 꼭 챙겨주세요!
          </Text>
        </View>

        {/* 3. Gadget Image */}
        <View style={s.weatherImageContainer}>
          <Image
            source={require("#/images/umbrella.png")}
            style={s.weatherImage}
          />
          <Image
            source={require("#/images/rains.png")}
            style={s.rainImage}
          />
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
    backgroundColor: "black",
  },
  rainImage: {
    width: 274.883,
    height: 304.739,
    backgroundColor: "black",
    position: "absolute",
    top: 0,
    zIndex: -1,
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
});
