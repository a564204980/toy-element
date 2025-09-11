import type { Placement, Options } from "@popperjs/core";

export interface TooltipProps {
  content?: string;
  trigger?: "hover" | "click" | "contextmenu"; // 触发方式
  placement?: Placement; // 弹出位置
  manual?: boolean; // 是否手动控制 tooltip 的显示/隐藏状态
  disabled?: boolean;
  popperOptions?: Partial<Options>;
  transition?: string; // 自定义动画
  showTimeout?: number;
  hiddenTimeout?: number; // 隐藏和展示的一个延时，针对hover的触发方式
}

export interface TooltipEmits {
  (e: "visible-change", value: boolean): void;
  (e: "hide-outside"): void;
}

export interface TooltipInstance {
  show(): void;
  hide(): void;
}
