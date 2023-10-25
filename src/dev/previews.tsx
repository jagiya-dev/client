import React from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import AlarmContainer from "@/components/alarm/Alarm.Container";
import Navigation from "@/navigation/navigation";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/AlarmContainer">
        <AlarmContainer />
      </ComponentPreview>
      <ComponentPreview path="/Navigation">
        <Navigation />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
