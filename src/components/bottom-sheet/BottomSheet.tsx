import BottomSheet_ from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import type { PropsWithChildren } from "react";
import Backdrop from "./Backdrop";

export enum EBottomSheetOpenState {
  CLOSE = -1,
  OPEN = 0,
}

type Props = {
  bOpen: EBottomSheetOpenState;
  setIsOpen: (bOpen: EBottomSheetOpenState) => void;
  height?: number;
} & PropsWithChildren;

const BottomSheet = (props: Props) => (
  <BottomSheet_
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
