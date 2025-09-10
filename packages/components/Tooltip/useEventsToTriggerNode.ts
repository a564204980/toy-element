import { each, isElement } from "lodash-es";
import { onMounted, onUnmounted, watch } from "vue";
import type { TooltipProps } from "./types";
import type { ComputedRef, Ref, WatchStopHandle } from "vue";

export const useEventsToTriggerNode = (
  props: TooltipProps & { virtualTriggering?: boolean },
  triggerNode: ComputedRef<HTMLElement | undefined>, // 触发的节点
  events: Ref<Record<string, EventListener>>, // 绑定的事件
  closeMethod: () => void
) => {
  let watchEventsStopHandle: WatchStopHandle | void;
  let watchTriggerNodeStopHandle: WatchStopHandle | void;

  const _eventHandleMap = new Map(); // 记录已绑定事件的函数

  // 绑定事件到虚拟触发节点
  const _bindEventToVirtualTiggerNode = () => {
    const el = triggerNode.value;
    isElement(el) &&
      each(events.value, (fn, event) => {
        _eventHandleMap.set(event, fn);
        el?.addEventListener(event as keyof HTMLElementEventMap, fn);
      });
  };

  // 从虚拟触发元素上解绑事件
  const _unbindEventToVirtualTiggerNode = () => {
    const el = triggerNode.value;
    isElement(el) &&
      each(["mouseenter", "click", "contextmenu"], (key) => {
        _eventHandleMap.has(key) &&
          el?.removeEventListener(key, _eventHandleMap.get(key));
      });
  };

  onMounted(() => {
    watchTriggerNodeStopHandle = watch(
      triggerNode,
      () => {
        props.virtualTriggering && _bindEventToVirtualTiggerNode();
      },
      { immediate: true }
    );

    // 监听事件映射的变化
    watchEventsStopHandle = watch(
      events,
      () => {
        if (!props.virtualTriggering) return;
        _unbindEventToVirtualTiggerNode();
        _bindEventToVirtualTiggerNode();
        closeMethod();
      },
      { deep: true }
    );
  });

  onUnmounted(() => {
    watchEventsStopHandle?.();
    watchTriggerNodeStopHandle?.();
    _unbindEventToVirtualTiggerNode();
  });
};

export default useEventsToTriggerNode;
