import { atom } from "recoil";
import { color } from "@/styles/color";

interface StyleState {
  colors: typeof color;
}

const s = ({ colors: { primary, sub, gray } }: StyleState) => {};

export const styleState = atom({
  key: "style",
  default: {
    colors: color,
  },
});
