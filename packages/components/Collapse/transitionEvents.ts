const _setHeightZero = (el: HTMLElement) => (el.style.height = "0px");
const _setHeightScroll = (el: HTMLElement) =>
  (el.style.height = `${el.scrollHeight}px`);
const _setHeightEmpty = (el: HTMLElement) => (el.style.height = "");
const _setOverflowHidden = (el: HTMLElement) => (el.style.overflow = "hidden");
const _setOverflowEmpty = (el: HTMLElement) => (el.style.overflow = "");

/**
 * transition的JS钩子事件
 */
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  /**
   * 进入动画开始前
   */
  beforeEnter(el) {
    _setHeightZero(el); // 设置高度为0
    _setOverflowHidden(el); // 隐藏溢出内容
  },

  /**
   * 进入动画执行中
   * 将元素高度设置为其滚动高度，触发高度变化的过渡动画
   */
  enter: (el) => {
    _setHeightScroll(el);
  },

  /**
   * 进入动画结束后
   */
  afterEnter(el) {
    _setHeightEmpty(el); // 清除高度限制
    _setOverflowEmpty(el); // 恢复溢出属性
  },

  /**
   * 离开动画开始前
   * 设置元素当前的滚动高度，隐藏溢出内容，为收起动画做准备
   */
  beforeLeave(el) {
    _setHeightScroll(el); // 设置当前滚动高度
    _setOverflowHidden(el); // 隐藏溢出内容
  },

  /**
   * 离开动画执行中
   */
  leave: (el) => _setHeightZero(el),

  /**
   * 离开动画结束后
   */
  afterLeave(el) {
    _setHeightEmpty(el); // 清除高度限制
    _setOverflowEmpty(el); // 恢复溢出属性
  },
};

export default transitionEvents;
