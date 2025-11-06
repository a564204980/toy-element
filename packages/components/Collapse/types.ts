import type { Ref } from "vue";

export type CollapseItemName = string | number;

export interface CollapseProps {
  modelValue: CollapseItemName[]; // 当前展开的折叠面板项
  accordion?: boolean; // 是否开启手风琴模式
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

export interface CollapseContext {
  activeNames: Ref<CollapseItemName[]>;
  handleItemClick(name: CollapseItemName): void;
}
