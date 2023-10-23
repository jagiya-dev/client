import Dialog from "@/components/dialog/Dialog";
import { EDialogType } from "@/components/dialog/EDialogType";
import React from "react";
import type { WithdrawCompleteProps } from "@/components/dialog/type";

const WithdrawCompleteDialog = (props: WithdrawCompleteProps) => (
  <Dialog
    type={EDialogType.withdrawComplete}
    title="탈퇴가 완료되었습니다."
    ok="확인"
    isOpen={props.isOpen}
    onPressOk={props.onPressOk}
  />
);
export default WithdrawCompleteDialog;
