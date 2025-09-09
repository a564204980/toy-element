import { type Ref } from "vue";
import useEventListener from "./useEventListener";

/**
 * 监听"点击元素外部"的事件
 * @param {Ref<HTMLElement | null>} elementRef - 要监听的目标元素的Ref（响应式引用）
 * @param {(e: MouseEvent) => void} callback - 点击外部时触发的回调函数
 */
export default function useClickOutside(
  elementRef: Ref<HTMLElement | null>,
  callback: (e: MouseEvent) => void
) {
  useEventListener(document, "click", (e: Event) => {
    if (elementRef.value && e.target) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        // 点击的目标元素不在目标元素内，就传入鼠标事件对象
        callback(e as MouseEvent);
      }
    }
  });
}
