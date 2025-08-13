import type { Component } from "vue";

export type NativeType = "button" | "submit" | "reset";
export type ButtonSize = "medium" | "small" | "default";
export type ButtonType = "primary" | "success" | "info" | "warning" | "danger";

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: NativeType; // 按钮的原生类型
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  circle?: boolean;
  plain?: boolean;
  round?: boolean;
  tag?: string | Component;
}
