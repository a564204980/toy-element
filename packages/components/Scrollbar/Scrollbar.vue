<script setup lang="ts">
import {
  ref,
  computed,
  provide,
  onMounted,
  nextTick,
  onBeforeUnmount,
} from "vue";
import { useNamespace } from "@toy-element/hooks";
import { scrollbarContextKey } from "./constants";
import { scrollbarProps, scrollbarEmits } from "./types";
import { throttle } from "@toy-element/utils";
import bar from "./Bar.vue";

defineOptions({
  name: "ErScrollbar",
});

const props = defineProps(scrollbarProps);
const emit = defineEmits(scrollbarEmits);

const ns = useNamespace("scrollbar");

const barRef = ref<InstanceType<typeof bar>>();
const wrapRef = ref<HTMLDivElement>();
const scrollbarRef = ref<HTMLDivElement>();

let wrapScrollTop = 0; // 记录垂直滚动位置
let wrapScrollLeft = 0; // 记录水平滚动位置

let stopResizeObserver: (() => void) | undefined = undefined;

provide(scrollbarContextKey, {
  scrollbarElement: scrollbarRef,
  wrapElement: wrapRef,
});

const wrapStyle = computed(() => {
  const style: any = {};

  if (props.height) {
    style.height =
      typeof props.height === "number" ? `${props.height}px` : props.height;
  }

  if (props.maxHeight) {
    style.maxHeight =
      typeof props.maxHeight === "number"
        ? `${props.maxHeight}px`
        : props.maxHeight;
    style.height = "100%";
  }

  return [props.wrapStyle, style];
});

const wrapClass = computed(() => {
  return [
    props.wrapClass,
    ns.e("wrap"),
    { [ns.em("wrap", "hidden-default")]: !props.native },
  ];
});

const handleScroll = throttle(() => {
  if (wrapRef.value) {
    wrapScrollTop = wrapRef.value.scrollTop;
    wrapScrollLeft = wrapRef.value.scrollLeft;

    barRef.value?.handleScroll(wrapRef.value);

    emit("scroll", {
      scrollLeft: wrapScrollLeft,
      scrollTop: wrapScrollTop,
    });
  }
}, 16);

/**
 * 更新滚动条
 */
const update = () => {
  barRef.value?.update();
};

const setScrollTop = (value: number) => {
  if (wrapRef.value) {
    wrapRef.value.scrollTop = value;
  }
};
const setScrollLeft = (value: number) => {
  if (wrapRef.value) {
    wrapRef.value.scrollLeft = value;
  }
};

// 组件挂载后初始化滚动条尺寸
onMounted(() => {
  nextTick(() => {
    update();
  });

  // 监听内容尺寸变化更新滚动条
  if (!props.nresize && wrapRef.value) {
    const resizeObserver = new ResizeObserver(() => {
      barRef.value?.update();
    });

    resizeObserver.observe(wrapRef.value);

    stopResizeObserver = () => {
      resizeObserver.disconnect();
    };
  }
});

onBeforeUnmount(() => {
  if (stopResizeObserver) {
    stopResizeObserver();
  }
});

defineExpose({
  update,
  setScrollTop,
  setScrollLeft,
  wrapRef,
});
</script>

<template>
  <div ref="scrollbarRef" :class="ns.b()">
    <div
      ref="wrapRef"
      :style="wrapStyle"
      :class="wrapClass"
      @scroll="handleScroll"
    >
      <slot></slot>
    </div>

    <!-- 
      自定义滚动条组件
      只有在非原生模式下才显示
    -->
    <template v-if="!native">
      <bar ref="barRef" :always="always" :min-size="minSize"></bar>
    </template>
  </div>
</template>

<style>
@import "./style.scss";
</style>
