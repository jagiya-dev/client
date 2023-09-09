import {StyleSheet, View, ViewProps} from "react-native/types";
import { useState, type PropsWithChildren } from "react";
import {CloseIcon} from "./Icon";


type Props = PropsWithChildren & ViewProps;

const Tooltip = (props: Props) => {
  const [bOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = (e: any) => setTooltipOpen((prev) => !prev);

  return (
    <View style={s.root}>
      <View style={s.contentsContainer}>
        {props.children}
      </View>

      <CloseIcon style={s.closeIcon} onPress={toggleTooltip}/>
    </View>
  )
};

export default Tooltip;

const s = StyleSheet.create({
  root: {
    position: "relative",
  },
  contentsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
  }
});


