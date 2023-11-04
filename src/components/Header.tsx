import { StyleSheet } from "react-native";
import { color } from "@/styles/color";
import { font } from "@/styles/font";

export const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 72,
    position: "relative",
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
  headerText: {
    color: color.primary["600"],
    fontSize: 22,
    fontWeight: "800",
  },
  headerIcon: {
    tintColor: color.gray["300"],
    width: 30,
    height: 30,
  },
  headerClickable: {
    zIndex: 10,
  },
  headerRight: {
    position: "absolute",
    top: 20,
    bottom: 0,
    right: -140,
  },
  headerLeftIcon: {
    position: "absolute",
    top: 20,
    bottom: 0,
    right: 140,
  },
});
