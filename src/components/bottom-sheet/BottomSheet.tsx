import BottomSheet_ from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import type { PropsWithChildren, RefObject } from "react";
import Text from "@/components/Text";
import { font } from "@/styles/font";
import Backdrop from "./Backdrop";

export enum EBottomSheetOpenState {
  CLOSE = -1,
  OPEN = 0,
}

type Props = {
  bottomSheetRef: RefObject<BottomSheet_>;
  bOpen: EBottomSheetOpenState;
  setIsOpen: (bOpen: EBottomSheetOpenState) => void;
  title: string;
  height?: number;
} & PropsWithChildren;

const BottomSheet = (props: Props) => (
  <BottomSheet_
    ref={props.bottomSheetRef}
    index={Number(props.bOpen)}
    snapPoints={[(props.height ?? 90).toString() + "%"]}
    containerStyle={s.root}
    enablePanDownToClose
    backdropComponent={(props) => <Backdrop {...props} />}
    onClose={() => props.setIsOpen(EBottomSheetOpenState.CLOSE)}
  >
    {props.children}
  </BottomSheet_>
);

export default BottomSheet;

const s = StyleSheet.create({
  root: {
    flex: 1,
    zIndex: 10,
    backgroundColor: "rgba(37, 40, 43, 0.75)",
  },
});
