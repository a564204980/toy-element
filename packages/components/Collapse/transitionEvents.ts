const _setHeightZero = (el: HTMLElement) => (el.style.height = "0px");
const _setHeightScroll = (el: HTMLElement) =>
  (el.style.height = `${el.scrollHeight}px`);
const _setHeightEmpty = (el: HTMLElement) => (el.style.height = "");
const _setOverflowHidden = (el: HTMLElement) => (el.style.overflow = "hidden");
const _setOverflowEmpty = (el: HTMLElement) => (el.style.overflow = "");

/**
 * 折叠面板过渡动画事件处理器
 * 定义了折叠展开和收起过程中各个阶段的动画处理逻辑
 * 通过控制元素的高度和溢出属性来实现平滑的展开/收起动画效果
 */
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  /**
   * 展开动画开始前的准备阶段
   * 将元素高度设为0，隐藏溢出内容，为展开动画做准备
   * @param el - 要进行动画的DOM元素
   */
  beforeEnter(el) {
    _setHeightZero(el);        // 设置高度为0
    _setOverflowHidden(el);    // 隐藏溢出内容
  },
  
  /**
   * 展开动画执行阶段
   * 将元素高度设置为其滚动高度，触发高度变化的过渡动画
   * @param el - 要进行动画的DOM元素
   */
  enter: (el) => {
    _setHeightScroll(el)
  },
  
  /**
   * 展开动画完成后的清理阶段
   * 移除高度限制，恢复正常的溢出行为，让内容自然显示
   * @param el - 要进行动画的DOM元素
   */
  afterEnter(el) {
    _setHeightEmpty(el);       // 清除高度限制
    _setOverflowEmpty(el);     // 恢复溢出属性
  },
  
  /**
   * 收起动画开始前的准备阶段
   * 设置元素当前的滚动高度，隐藏溢出内容，为收起动画做准备
   * @param el - 要进行动画的DOM元素
   */
  beforeLeave(el) {
    _setHeightScroll(el);      // 设置当前滚动高度
    _setOverflowHidden(el);    // 隐藏溢出内容
  },
  
  /**
   * 收起动画执行阶段
   * 将元素高度设为0，触发高度收缩的过渡动画
   * @param el - 要进行动画的DOM元素
   */
  leave: (el) => _setHeightZero(el),
  
  /**
   * 收起动画完成后的清理阶段
   * 清除高度和溢出属性的设置，恢复元素的默认状态
   * @param el - 要进行动画的DOM元素
   */
  afterLeave(el) {
    _setHeightEmpty(el);       // 清除高度限制
    _setOverflowEmpty(el);     // 恢复溢出属性
  },
};

export default transitionEvents
