import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface IconProps {
  /* 基础样式与布局相关 */
  border?: boolean;
  fixedWidth?: boolean; // 固定宽度
  pull?: "left" | "right"; // 浮动方向
  listItem?: boolean; // 列表项

  /* 图标变形与旋转相关 */
  flip?: "horizontal" | "vertical" | "both"; // 翻转 水平 | 垂直 | 双向翻转
  rotation?: 90 | 180 | 270 | "90" | "180" | "270"; // 旋转角度
  transform?: object | string; // 图标变形处理

  /* 动画相关 */
  spin?: boolean; // 是否旋开启转动画
  pulse?: boolean; // 使图标以脉冲式旋转
  bounce?: boolean; // 使图标产生弹跳动画
  shake?: boolean; // 使图标产生抖动动画
  beat?: boolean; // 使图标产生心跳动画
  fade?: boolean; // 使图标产生淡入淡出动画
  beatFade?: boolean; // 使图标产生心跳和淡入淡出动画
  spinPulse?: boolean; // 使图标以脉冲式旋转并开启转动画
  spinReverse?: boolean; // 使图标以相反方向旋转

  /* 图标核心配置相关 */
  icon: object | Array<string> | string | IconDefinition; // 图标
  mask?: object | Array<string> | string; // 遮罩
  symbol?: boolean | string; // 图标注册为 SVG 符号

  /* 视觉样式扩展 */
  size?:
    | "2xs"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "2xl"
    | "1x"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";
  title?: string; // 图标标题
  inverse?: boolean; // 反转图标颜色
  type?: "primary" | "success" | "warning" | "danger" | "info";
  color?: string;
}
