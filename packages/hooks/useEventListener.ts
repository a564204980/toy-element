import {
  watch,
  onMounted,
  onUnmounted,
  unref,
  isRef,
  type MaybeRef,
} from "vue";

/**
 * dom事件监听，适合 “非模板元素（window/document）、动态元素、逻辑层统一管理”，灵活性更高，能自动处理生命周期和解绑
 * @param target 事件目标
 * @param event 事件名
 * @param handler 事件处理函数
 */
export default function useEventListener(
  target: MaybeRef<EventTarget | HTMLElement | void>,
  event: string,
  handler: (e: Event) => any
) {
  if (isRef(target)) {
    watch(target, (val, oldVal) => {
      // 先移除事件
      oldVal?.removeEventListener(event, handler);
      val?.addEventListener(event, handler);
    });
  } else {
    onMounted(() => {
      target?.addEventListener(event, handler);
    });
  }

  onUnmounted(() => {
    unref(target)?.removeEventListener(event, handler);
  });
}
