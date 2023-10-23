import Dialog from "@/components/dialog/Dialog";
import { EDialogType } from "@/components/dialog/EDialogType";
import React from "react";
import type { WithdrawProps } from "@/components/dialog/type";

const WithdrawDialog = (props: WithdrawProps) => (
  <Dialog
    type={EDialogType.withdraw}
    title="정말 탈퇴하시겠어요?"
    subTitle="탈퇴하셨더라도 다시 가입하면 이전에 등록한 알람 정보를 바로 불러올 수 있어요"
    ok="탈퇴하기"
    cancel="취소"
    isOpen={props.isOpen}
    onPressOk={props.onPressOk}
    onPressCancel={props.onPressCancel}
  />
);
export default WithdrawDialog;
