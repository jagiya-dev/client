import React from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import AlarmContainer from "@/components/alarm/Alarm.Container";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/AlarmContainer">
        <AlarmContainer />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
