<script setup lang="ts">
import { ref, computed } from "vue";
import { scrollbarProps, scrollbarEmits } from "./types";
import { useNamespace } from "@toy-element/hooks";
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

const handleScroll = () => {
  if (wrapRef.value) {
    wrapScrollTop = wrapRef.value.scrollTop;
    wrapScrollLeft = wrapRef.value.scrollLeft;

    // TODO: 通知 Bar 组件：内容滚动了，更新滚动条位置
    barRef.value?.handleScroll(wrapRef.value);

    emit("scroll", {
      scrollLeft: wrapScrollLeft,
      scrollTop: wrapScrollTop,
    });
  }
};

/**
 * 更新滚动条
 */
const update = () => {
  // TODO：通知 Bar 组件重新计算滚动条尺寸
};
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

<style scoped>
@import "./style.scss";
</style>
