import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import type { RefObject } from "react";
import Text from "@/components/Text";
import { font } from "@/styles/font";

export enum EBottomSheetOpenState {
  CLOSE = -1,
  OPEN = 0,
}

type Props = {
  bottomSheetRef: RefObject<BottomSheet>;
  bOpen: EBottomSheetOpenState;
  setIsOpen: (bOpen: EBottomSheetOpenState) => void;
  title: string;
  height?: number;
};

const RegionBottomSheet = (props: Props) => {
  return (
    <BottomSheet
      ref={props.bottomSheetRef}
      index={Number(props.bOpen)}
      snapPoints={[(props.height ?? 90).toString() + "%"]}
      containerStyle={s.root}
      enablePanDownToClose
      onClose={() => props.setIsOpen(EBottomSheetOpenState.CLOSE)}
    >
      <View style={s.titleContainer}>
        <Text style={s.title}>{props.title}</Text>
      </View>
      <View style={s.searchBar}></View>
    </BottomSheet>
  );
};

export default RegionBottomSheet;

const s = StyleSheet.create({
  root: {
    flex: 1,
    zIndex: 10,
    backgroundColor: "rgba(37, 40, 43, 0.75)",
  },
  dimBackground: {},

  titleContainer: {
    paddingVertical: 8,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: font.title["2"].size,
    fontWeight: font.title["2"].weight,
    lineHeight: font.title["2"].height,
    alignSelf: "center",
  },

  searchBar: {},
  searchBarLabel: {},

  searchResultLabel: {},
  searchResultContainer: {},
  sheetSearchResultItem: {},
});
