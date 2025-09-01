import type { Ref } from "vue";

export type CollapseItemName = string | number;

export interface CollapseProps {
  modelValue: CollapseItemName[]; // 存储已展开面板的标识集合
  accordion?: boolean; // 手风琴模式
}

export interface CollapseItemProps {
  name: CollapseItemName;
  title?: string;
  disabled?: boolean;
}

export interface CollapseEmits {
  (e: "update:modelValue", value: CollapseItemName[]): void;
  (e: "change", value: CollapseItemName[]): void;
}

// 上下文  适用于一父多子组件的情况
export interface CollapseContext {
  activeNames: Ref<CollapseItemName[]>;
  handleItemClick(name: CollapseItemName): void;
}
