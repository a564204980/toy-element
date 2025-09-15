import type { ButtonType } from "../Button/type";

export interface PopconfirmProps {
  title: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonType?: ButtonType;
  cancelButtonType?: ButtonType;
  icon?: string;
  iconColor?: string;
  hideIcon?: boolean;
  hideAfter?: number; // 隐藏时间
  width?: number | string;
}

export interface PopconfirmEmits {
  (e: "confrim", value: MouseEvent): void;
  (e: "cancel", value: MouseEvent): void;
}
