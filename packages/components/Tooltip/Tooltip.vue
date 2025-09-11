<template>
  <!--v-on 批量绑定多个事件-->
  <div class="er-tooltip" ref="containerNode" v-on="outerEvents">
    <div
      class="er-tooltip__trigger"
      ref="_triggerNode"
      v-on="events"
      v-if="!virtualTriggering"
    >
      <slot></slot>
    </div>
    <slot name="default" v-else></slot>

    <transition :name="transition">
      <div
        class="er-tooltip__popper"
        ref="popperNode"
        v-on="dropdownEvent"
        v-if="visible"
      >
        <slot name="content">{{ content }}</slot>
        <!-- 箭头 -->
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useClickOutside } from "@toy-element-clone/hooks";
import { createPopper, type Instance } from "@popperjs/core";
import useEventsToTriggerNode from "./useEventsToTriggerNode.ts";
import { bind, debounce, isNil, type DebouncedFunc } from "lodash-es";
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./types";
import { ref, computed, watchEffect, watch, onUnmounted, type Ref } from "vue";

interface _TooltipProps extends TooltipProps {
  virtualRef?: HTMLElement | void;
  virtualTriggering?: boolean; // 是否开启虚拟触发
}

defineOptions({
  name: "ErTooltip",
});

const props = withDefaults(defineProps<_TooltipProps>(), {
  placement: "bottom",
  trigger: "hover",
  transition: "fade", // 过渡动画
  showTimeout: 0,
  hiddenTimeout: 200,
});

const emits = defineEmits<TooltipEmits>();

const visible = ref(false);
const virtualTriggering = ref(false); // 虚拟触发，用于插槽内容的触发

const events: Ref<Record<string, EventListener>> = ref({}); // 触发元素的事件
const outerEvents: Ref<Record<string, EventListener>> = ref({}); // 外层的所有事件
const dropdownEvent: Ref<Record<string, EventListener>> = ref({}); // 弹出层的所有事件

const containerNode = ref<HTMLElement | null>(null);
const popperNode = ref<HTMLElement>();
const _triggerNode = ref<HTMLElement>();

const triggerNode = computed(() => {
  if (props.virtualTriggering) {
    return (props.virtualRef as HTMLElement) ?? _triggerNode.value;
  }
  return _triggerNode.value as HTMLElement;
});

const popperOptions = computed(() => ({
  placement: props.placement,
  // 偏移量
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
  ],
  ...props.popperOptions,
}));

let openDebounce: DebouncedFunc<() => void> | void; // 打开的防抖函数
let closeDebounce: DebouncedFunc<() => void> | void; // 关闭的防抖函数

const openFinal = () => {
  closeDebounce?.cancel();
  openDebounce?.();
};

const closeFinal = () => {
  openDebounce?.cancel();
  closeDebounce?.();
};

const togglePopper = () => {
  visible.value ? closeFinal() : openFinal();
};

const setVisible = (val: boolean) => {
  if (props.disbaled) return;
  visible.value = val;
  emits("visible-change", val);
};

const openDelay = computed(() =>
  props.trigger === "hover" ? props.showTimeout : 0
);
const closeDelay = computed(() =>
  props.trigger === "hover" ? props.hiddenTimeout : 0
);

const triggerStrategyMap: Map<string, () => void> = new Map();
triggerStrategyMap.set("hover", () => {
  events.value["mouseenter"] = openFinal; // 显示
  outerEvents.value["mouseleave"] = closeFinal; // 离开隐藏
  dropdownEvent.value["mouseenter"] = openFinal; // 弹出层进入显示
});
triggerStrategyMap.set("click", () => {
  events.value["click"] = togglePopper;
});
triggerStrategyMap.set("contextmenu", () => {
  events.value["contextmenu"] = ((e: Event) => {
    // 阻止默认的右键菜单事件
    e.preventDefault();
    openFinal();
  }) as EventListener;
  return;
});

// 绑定事件
const attachEvents = () => {
  if (props.disbaled || props.manual) return;
  triggerStrategyMap.get(props.trigger)?.();
};

let popperInstance: Instance | null;

// 销毁弹出元素
const destroyPopperInstance = () => {
  // isNil 检查是否是null或undefined，如果是返回true
  if (isNil(popperInstance)) return;
  popperInstance.destroy();
  popperInstance = null;
};

const resetEvents = () => {
  events.value = {};
  outerEvents.value = {};
  dropdownEvent.value = {};

  attachEvents();
};

const show: TooltipInstance["show"] = openFinal;
const hide: TooltipInstance["hide"] = function () {
  openDebounce?.cancel();
  setVisible(false);
};

watch(
  visible,
  (val) => {
    if (!val) return;

    if (triggerNode.value && popperNode.value) {
      // 创建弹出元素
      popperInstance = createPopper(
        triggerNode.value,
        popperNode.value,
        popperOptions.value
      );
    }
  },
  // 在dom更新之后再执行回调函数
  { flush: "post" }
);

watch(
  () => props.manual,
  (isManuval) => {
    if (isManuval) {
      resetEvents();
      return;
    }

    attachEvents();
  }
);

watch(
  () => props.trigger,
  (val, oldVal) => {
    if (val === oldVal) return;
    openDebounce?.cancel();
    visible.value = false;
    emits("visible-change", false);
    resetEvents();
  }
);

// 监听容器外部的点击事件
useClickOutside(containerNode, () => {
  emits("hide-outside");
  if (props.trigger === "hover" || props.manual) return;
  visible.value && closeFinal();
});

useEventsToTriggerNode(props, triggerNode, events, closeFinal);

// 组件挂载时开始监听
watchEffect(() => {
  if (!props.manual) {
    attachEvents();
  }

  // 等同于 debounce(() => setVisible(true), openDelay)，因为debounce里面的这个第一个参数需要一个待执行函数
  // bind绑定的为null表示不关心this的指向，true是传递给setVisible的参数
  openDebounce = debounce(bind(setVisible, null, true), openDelay.value);
  closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value);
});

onUnmounted(() => {
  destroyPopperInstance();
});

defineExpose<TooltipInstance>({
  show,
  hide,
});
</script>

<style scoped>
@import "./style.css";
</style>
