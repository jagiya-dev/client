import {
  Animated,
  StyleSheet,
  SwitchProps,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { color } from "@/styles/color";

type Prop = SwitchProps;

const animationDuration = 200;

const Toggle = (prop: Prop) => {
  const [isEnabled, setIsEnabled] = useState(!prop.disabled);
  const toggle = () => setIsEnabled((prev) => !prev);

  const toggleColorChangeAnim = useRef(new Animated.Value(0)).current;

  const interpolateColor = toggleColorChangeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [color.primary["600"], color.gray["200"]],
  });

  const toggleMoveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(toggleColorChangeAnim, {
      toValue: isEnabled ? 0 : 1,
      duration: animationDuration * 0.5,
      useNativeDriver: true,
    }).start();
  }, [isEnabled, toggleColorChangeAnim]);

  useEffect(() => {
    Animated.timing(toggleMoveAnim, {
      toValue: isEnabled ? 0 : -30,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  }, [isEnabled, toggleMoveAnim]);

  return (
    <TouchableHighlight
      onPress={toggle}
      style={s.resetTouchable}
      underlayColor="none"
    >
      <Animated.View style={[s.root, { backgroundColor: interpolateColor }]}>
        <Animated.View
          style={[s.handle, { transform: [{ translateX: toggleMoveAnim }] }]}
        />
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
