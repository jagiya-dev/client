import { Switch, SwitchProps } from "react-native";
import { color } from "@/styles/color";
import { useState } from "react";

type Props = {
  initialIsEnabled?: boolean;
} & SwitchProps;

const Toggle = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(props.initialIsEnabled ?? true);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
    <Switch
      {...props}
      trackColor={{
        true: color.primary["600"],
        false: color.gray["100"],
      }}
      thumbColor={"white"}
      value={isEnabled}
      onValueChange={toggleSwitch}
    />
  );
};
export default Toggle;
