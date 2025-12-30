import type { PropType, StyleValue, ExtractPropTypes } from "vue";

export const scrollbarProps = {
  height: {
    type: [String, Number] as PropType<string | number>,
    default: "",
  },
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: "",
  },
  native: Boolean, // 是否使用原生滚动条
  /**
   * wrap的容器样式
   */
  wrapStyle: {
    // 给元素绑定内联样式就可以用StyleValue这种联合类型
    type: [String, Object, Array] as PropType<StyleValue>,
    default: "",
  },
  /**
   * wrap容器的类名
   */
  wrapClass: {
    type: [String, Array] as PropType<string | string[]>,
    default: "",
  },
  /**
   * view容器呃类名
   */
  viewClass: {
    type: [String, Array] as PropType<string | string[]>,
    default: "",
  },
  /**
   * view容器的样式
   */
  viewStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: "",
  },
  nresize: Boolean, // 不响应让其尺寸的变化
  /**
   * view容器的标签
   */
  tag: {
    type: String,
    default: "div",
  },
  /**
   * 是否始终显示滚动条
   */
  always: {
    type: Boolean,
    default: false,
  },
  /**
   * 滚动条最小尺寸
   */
  minSize: {
    type: Number,
    default: 20,
  },
} as const;

export type scrollbarProps = ExtractPropTypes<typeof scrollbarProps>;

export const scrollbarEmits = {
  scroll: (data: { scrollTop: number; scrollLeft: number }) =>
    typeof data.scrollTop === "number" && typeof data.scrollLeft === "number",
};

export type scrollbarEmits = ExtractPropTypes<typeof scrollbarEmits>;

export const barProps = {
  /**
   * 是否始终显示滚动条
   */
  always: Boolean,
  minSize: {
    type: Number,
    default: 20,
  },
} as const;

export const thumbProps = {
  /**
   * 纵向滑块标识
   */
  vertical: Boolean,
  /**
   * 滑块尺寸
   */
  size: String,
  /**
   * 滑块移动的距离
   */
  move: Number,
  /**
   * 滑块移动的比例
   */
  ratio: Number,
  /**
   * 是否始终显示滚动条
   */
  always: Boolean,
} as const;

export type ScrollbarDirection = "vertical" | "horizontal";
