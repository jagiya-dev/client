import { StyleSheet } from "react-native";
import { color } from "@/styles/color";
import { font } from "@/styles/font";

export const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    // position: "relative",
  },
  headerSpaceBetween: {
    justifyContent: "space-between",
  },
  headerCenter: {
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    fontFamily: "Pretendard",
  },
  headerTitleFlex: {
    flex: 3.6,
  },
  headerText: {
    color: color.primary["600"],
    fontSize: 22,
    fontWeight: "800",
  },
  headerText2: {
    fontSize: font.body["5"].size,
    fontWeight: font.body["5"].weight,
  },
  headerIcon: {
    tintColor: color.gray["300"],
    width: 30,
    height: 30,
  },
  headerClickable: {
    zIndex: 10,
  },
  headerPositional: {
    flex: 3,
  },
  // headerRight: {
  //   // position: "absolute",
  //   // top: 20,
  //   // bottom: 0,
  //   // right: 10,
  // },
  // headerLeftIcon: {
  //   // position: "absolute",
  //   // top: 35,
  //   // bottom: 0,
  //   // left: 10,
  // },
});
