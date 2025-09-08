<template>
  <!--v-on 批量绑定多个事件-->
  <div class="er-tooltip" ref="containerNode" v-on="outerEvents">
    <div
      class="er-tooltip__trigger"
      ref="triggerNode"
      v-on="events"
      v-if="!virtualTriggering"
    >
      <slot></slot>
    </div>
    <slot name="default"></slot>

    <transition :name="transition">
      <div class="er-tooltip__popper" v-on="dropdownEvent" v-if="visible">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { debounce, type DebouncedFunc } from "lodash-es"
import { ref, computed,watchEffect, type Ref } from "vue";
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./types";

defineOptions({
  name: "ErTooltip",
});

const props = withDefaults(defineExpose<TooltipProps>(), {
  placement: "buttom",
  trigger: "hover",
  transition: "fade",
  showTimeout: 0,
  hiddenTimeout: 200,
});

const emits = defineEmits<TooltipEmits>();

const visible = ref(false);
const virtualTriggering = ref(false);

const events: Ref<Record<string, EventListener>> = ref({});
const outerEvents: Ref<Record<string, EventListener>> = ref({}); // 外层的事件
const dropdownEvent: Ref<Record<string, EventListener>> = ref({}); // 弹出层的事件

const containerNode = ref<HTMLDivElement>();
const triggerNode = ref<HTMLDivElement>();

const popperOptions = computed(() => ({
    placement.props.placement,
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
}))

let openDebounce:DebouncedFunc<() => void> | void // 打开的防抖函数
let closeDebounce:DebouncedFunc<() => void> | void // 关闭的防抖函数


const openFinal = () => {
  closeDebounce?.cancel()
  openDebounce?.()
}

const closeFinal = () => {
  openDebounce?.cancel()
  closeDebounce?.()
}
</script>
