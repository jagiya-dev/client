import { StyleSheet, SwitchProps, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import { color } from "@/styles/color";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const Toggle = (prop: SwitchProps) => {
  const [isEnabled, setIsEnabled] = useState(!prop.disabled);
  const toggle = () => setIsEnabled((prev) => !prev);

  const bgColor = useDerivedValue(() => withTiming(isEnabled ? 1 : 0));
  const handlePosX = useDerivedValue(() => (isEnabled ? 0 : -30));

  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      bgColor.value,
      [0, 1],
      [color.gray["200"], color.primary["600"]],
    ),
  }));

  const handleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(handlePosX.value, { damping: 30 }) }],
  }));

  return (
    <TouchableHighlight
      onPress={toggle}
      style={s.resetTouchable}
      underlayColor="none"
    >
      <Animated.View style={[s.root, bgStyle]}>
        <Animated.View style={[s.handle, handleStyle]} />
      </Animated.View>
    </TouchableHighlight>
  );
};

export default Toggle;

const s = StyleSheet.create({
  resetTouchable: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  root: {
    width: 64,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: color.gray["200"],
    overflow: "hidden",
    flexDirection: "row-reverse",
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  handle: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: color.gray["50"],
  },
});
