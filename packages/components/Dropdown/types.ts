import type { VNode, ComputedRef } from "vue";
import type { TooltipProps } from "../Tooltip/types";
import type { ButtonType, ButtonSize } from "../Button/type";

// 下拉菜单命令
export type DropdownCommand = string | number;

export interface DropdownItemProps {
  label: string | VNode; // 标签
  disabled?: boolean;
  divided?: boolean; // 是否显示分割线
  command?: DropdownCommand; // 命令
}

export interface DropdownProps extends TooltipProps {
  type?: ButtonType;
  size?: ButtonSize;
  items?: DropdownItemProps[];
  hideOnClick?: boolean; // 点击菜单项后是否自动关闭菜单
  splitButton?: boolean; // 是否显示分割按钮
}

export interface DropdownEmits {
  (e: "click", value: MouseEvent): void;
  (e: "visible-change", value: boolean): void;
  (e: "command", value: DropdownCommand): void;
}

export interface DropdownInstance {
  open(): void;
  close(): void;
}

// 依赖注入上下文
export interface DropdownContext {
  handleItemClick(item: DropdownItemProps): void;
  size: ComputedRef<ButtonSize | void>;
}
