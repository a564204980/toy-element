const _setHeightZero = (el: HTMLElement) => (el.style.height = "0px");
const _setHeightScroll = (el: HTMLElement) =>
  (el.style.height = `${el.scrollHeight}px`);
const _setHeightEmpty = (el: HTMLElement) => (el.style.height = "");
const _setOverflowHidden = (el: HTMLElement) => (el.style.overflow = "hidden");
const _setOverflowEmpty = (el: HTMLElement) => (el.style.overflow = "");

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  // 进入动画开始前
  beforeEnter(el) {
    _setHeightZero(el);
    _setOverflowHidden(el);
  },
  // 进入动画执行时
  enter(el) {
    _setHeightScroll(el);
  },

  // 进入动画结束后
  afterEnter(el) {
    _setHeightEmpty(el);
    _setOverflowEmpty(el);
  },

  // 离开动画开始前
  beforeLeave(el) {
    _setHeightScroll(el);
    _setOverflowHidden(el);
  },
  // 离开动画执行时
  leave: (el) => _setHeightZero(el),
  // 离开动画结束后
  afterLeave(el) {
    _setHeightEmpty(el);
    _setOverflowEmpty(el);
  },
};

export default transitionEvents;
