import { StyleSheet, View } from "react-native";
import { IconFactoryForDialog } from "@/components/Icon";
import Text from "@/components/Text";
import { Button } from "@/components/button";
import { font } from "@/styles/font";
import { color } from "@/styles/color";
import { EDialogType } from "@/components/dialog/EDialogType";

type Props = {
  type: EDialogType;
  title: string;
  subTitle?: string;
  ok: string;
  cancel?: string;
};

const Dialog = (props: Props) => (
  <View style={s.root}>
    {IconFactoryForDialog(props.type)}

    <Text style={s.title}>{props.title}</Text>

    {props.subTitle && <Text style={s.subtitle}>{props.subTitle}</Text>}

    <Button style={s.okButton}>
      <Text style={s.okButtonText}>{props.ok}</Text>
    </Button>

    {props.cancel && (
      <Button style={s.cancelButton}>
        <Text style={s.cancelButtonText}>{props.cancel}</Text>
      </Button>
    )}
  </View>
);
export default Dialog;

const s = StyleSheet.create({
  root: {
    position: "absolute",

    width: 304,
    // maxHeight: 286,

    paddingHorizontal: 24,
    paddingVertical: 36,

    borderRadius: 16,

    backgroundColor: "white",

    flexDirection: "column",

    alignSelf: "center",
    alignItems: "center",
  },

  title: {
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    lineHeight: font.body["1"].height,
  },

  subtitle: {
    fontSize: font.body["5"].size,
    fontWeight: font.body["5"].weight,
    lineHeight: font.body["5"].height,
    marginTop: 8,
  },

  okButton: {
    paddingHorizontal: 54,
    paddingVertical: 12,
    marginTop: 32,
    marginBottom: 16,

    backgroundColor: color.primary["600"],

    borderRadius: 32,

    width: 252,

    justifyContent: "center",
    alignItems: "center",
  },
  okButtonText: {
    fontSize: font.body["3"].size,
    fontWeight: font.body["3"].weight,
    lineHeight: font.body["3"].height,
    color: "white",
  },

  cancelButton: {
    width: 252,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: color.gray["400"],
  },
});
