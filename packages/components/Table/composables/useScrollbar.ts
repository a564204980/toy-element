import { ref, type Ref } from "vue";
import type { ErScrollbar, ScrollEventData } from "../../Scrollbar";
import { getScrollBarWidth, throttle } from "@toy-element/utils";

export interface UseScrollbarOptions {
  bodyWrapperRef: Ref<HTMLElement | undefined>;
  headerWrapperRef: Ref<HTMLElement | undefined>;
  scrollbarRef: Ref<InstanceType<typeof ErScrollbar> | undefined>;
}

export interface UseScrollbarReturn {
  hasScrollbar: Ref<boolean>; // 是否有纵向滚动条
  scrollbarWidth: Ref<number>; // 滚动条宽度
  checkScrollbar: () => void; // 检查是否有纵向滚动条
  handleScroll: (scrollData: ScrollEventData) => void; // 处理滚动事件
}

export const useScrollbar = (
  options: UseScrollbarOptions
): UseScrollbarReturn => {
  const { bodyWrapperRef, headerWrapperRef, scrollbarRef } = options;

  const hasScrollbar = ref(false);
  const scrollbarWidth = ref(0);

  /**
   * 检查是否有纵向滚动条
   */
  const checkScrollbar = () => {
    if (!bodyWrapperRef.value) {
      hasScrollbar.value = false;
      return;
    }

    hasScrollbar.value =
      bodyWrapperRef.value.scrollHeight > bodyWrapperRef.value.clientHeight;
  };

  /**
   * 监听表体滚动事件
   */
  const handleScroll = throttle((scrollData: ScrollEventData) => {
    if (!scrollbarRef.value || !headerWrapperRef.value) return;

    // 同步表头滚动
    headerWrapperRef.value.scrollLeft = scrollData.scrollLeft;
  }, 16);

  scrollbarWidth.value = getScrollBarWidth();

  return {
    hasScrollbar,
    scrollbarWidth,
    checkScrollbar,
    handleScroll,
  };
};
