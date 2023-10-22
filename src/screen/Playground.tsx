import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Dialog from "@/components/dialog/Dialog";
import { EDialogType } from "@/components/dialog/EDialogType";

const PlaygroundScreen = () => (
  <SafeAreaView style={s.root}>
    <Dialog
      type={EDialogType.withdraw}
      title="정말 탈퇴하시겠어요?"
      subTitle="탈퇴하셨더라도 다시 가입하면 이전에 등록한 알람 정보를 바로 불러올 수 있어요"
      ok="탈퇴하기"
      cancel="취소"
    />

    <Dialog
      type={EDialogType.withdrawComplete}
      title="탈퇴가 완료되었습니다."
      ok="확인"
    />

    <Dialog
      type={EDialogType.createAlarm}
      title="알람을 저장하지 않고 나가겠습니까?"
      ok="나가기"
      cancel="취소"
    />
  </SafeAreaView>
);

export default PlaygroundScreen;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: wp("100%"),
    height: hp("100%"),

    justifyContent: "center",

    // ...StyleSheet.absoluteFillObject,
  },
});
