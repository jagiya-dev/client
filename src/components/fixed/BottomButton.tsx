import { Platform, StyleSheet, View } from "react-native";
import { Button } from "@/components/button";
import Text from "@/components/Text";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { color } from "@/styles/color";
import { font } from "@/styles/font";

type Props = {
  onPress: () => void;
  text: string;
};

const BottomButton = (props: Props) => (
  <View style={s.saveContainer}>
    <Button style={s.saveButton} onPress={props.onPress}>
      <Text style={s.saveButtonInnerText}>{props.text ?? "완료"}</Text>
    </Button>
  </View>
);

export default BottomButton;

const s = StyleSheet.create({
  saveContainer: {
    width: widthPercentageToDP("100%"),
    height: 102,

    ...Platform.select({
      android: {
        bottom: 40,
      },
      ios: {
        bottom: -10,
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
