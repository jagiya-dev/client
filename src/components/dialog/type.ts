import { EDialogType } from "@/components/dialog/EDialogType";

export type CreateAlarmProps = Pick<
  DialogProps,
  "onPressOk" | "onPressCancel"
> &
  Openable;

export type WithdrawProps = CreateAlarmProps & Openable;

export type WithdrawCompleteProps = Pick<CreateAlarmProps, "onPressOk"> &
  Openable;

export type Openable = {
  isOpen: boolean;
};

export type DialogProps = {
  type: EDialogType;
  title: string;
  subTitle?: string;
  ok: string;
  cancel?: string;
  onPressOk?: () => void;
  onPressCancel?: () => void;
} & Openable;
