import { atom } from "recoil";
import { defaultColors } from "@/styles/defaultColors";

interface StyleState {
  colors: typeof defaultColors;
}

const s = ({ colors: { primary, sub, gray } }: StyleState) => {
};

export const styleState = atom({
  key: "style",
  default: {
    colors: defaultColors,
  },
});
