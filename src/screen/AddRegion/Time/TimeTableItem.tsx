import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Text from "@/components/Text";
import React from "react";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import { ETimeTableItemState } from "@/typing";

type Props = {
  time: string;
  index: number;
  state: ETimeTableItemState;
  onSelected: (index: number) => void;
};

const TimeTableItem = ({ time, index, state, onSelected }: Props) => {
  const bDisabled = state === ETimeTableItemState.disabled;

  return (
    <TouchableOpacity onPress={() => onSelected(index)} disabled={bDisabled}>
      <View style={makeViewStyle(state)}>
        <Text style={makeLabelStyle(state)}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TimeTableItem;

const s = StyleSheet.create({
  timeItem: {
    minWidth: 76,
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 16,
    paddingVertical: 12,

    borderRadius: 32,
    borderWidth: 1,
  },
  timeItemNormal: {
    backgroundColor: color.gray["50"],
    borderColor: color.gray["100"],
  },
  timeItemDisabled: {
    backgroundColor: color.gray["100"],
    borderColor: color.gray["100"],
  },
  timeItemSelected: {
    backgroundColor: color.primary["600"],
    borderColor: color.primary["600"],
  },

  timeItemLabel: {
    fontSize: font.body["2"].size,
    fontWeight: font.body["2"].weight,
    lineHeight: font.body["2"].height,
  },
  timeItemLabelNormal: {
    color: color.gray["400"],
  },
  timeItemLabelDisabled: {
    color: color.gray["200"],
  },
  timeItemLabelSelected: {
    color: "#ffffff",
  },
});

type MakeViewStyleReturnT = ViewStyle | ViewStyle[] | null;
type MakeLabelStyleReturnT = TextStyle | TextStyle[] | null;
const makeViewStyle = (state: ETimeTableItemState): MakeViewStyleReturnT => {
  switch (state) {
    case ETimeTableItemState.none:
      return [s.timeItem, s.timeItemNormal];

    case ETimeTableItemState.selected:
      return [s.timeItem, s.timeItemSelected];

    case ETimeTableItemState.disabled:
      return [s.timeItem, s.timeItemDisabled];
  }
};

const makeLabelStyle = (state: ETimeTableItemState): MakeLabelStyleReturnT => {
  switch (state) {
    case ETimeTableItemState.none:
      return [s.timeItemLabel, s.timeItemLabelNormal];

    case ETimeTableItemState.selected:
      return [s.timeItemLabel, s.timeItemLabelSelected];

    case ETimeTableItemState.disabled:
      return [s.timeItemLabel, s.timeItemLabelDisabled];
  }
};
