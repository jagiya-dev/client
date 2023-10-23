import Dialog from "@/components/dialog/Dialog";
import { EDialogType } from "@/components/dialog/EDialogType";
import React from "react";
import type { CreateAlarmProps } from "@/components/dialog/type";

const CreateAlarmDialog = (props: CreateAlarmProps) => (
  <Dialog
    type={EDialogType.createAlarm}
    title="알람을 저장하지 않고 나가겠습니까?"
    ok="나가기"
    cancel="취소"
    isOpen={props.isOpen}
    onPressOk={props.onPressOk}
    onPressCancel={props.onPressCancel}
  />
);
export default CreateAlarmDialog;
