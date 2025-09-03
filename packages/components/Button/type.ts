import type { Component, Ref, ComputedRef } from "vue";

export type NativeType = "button" | "submit" | "reset";
export type ButtonSize = "medium" | "small" | "default";
export type ButtonType = "primary" | "success" | "info" | "warning" | "danger";

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: NativeType; // 按钮的原生类型
  disabled?: boolean;
  loading?: boolean;
  loadingIcon?: string;
  icon?: string;
  circle?: boolean;
  plain?: boolean;
  round?: boolean;
  tag?: string | Component;
  autofocus?: boolean;
  useThrottle?: boolean; // 是否使用节流
  throttleDuration?: number; // 节流时间
}

export interface ButtonGroupProps {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}

// 依赖注入用的
export interface ButtonGroupContext {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}

export interface ButtonEmits {
  (e: "click", val: MouseEvent): void;
}

// 按钮实例
export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | undefined>;
  disabled: ComputedRef<boolean>;
  size: ComputedRef<ButtonSize>;
  type: ComputedRef<ButtonType>;
}
