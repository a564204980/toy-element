<script lang="ts" setup>
import Thumb from "./Thumb.vue";
import { inject, ref } from "vue";
import { barProps } from "./types";
import { useNamespace } from "@toy-element/hooks";
import { scrollbarContextKey } from "./constants";

defineOptions({
  name: "ErScrollbarBar",
});

const props = defineProps(barProps);
const ns = useNamespace("scrollbar");

const scrollbar = inject(scrollbarContextKey);

const moveX = ref(0); // 初始位置
const moveY = ref(0); // 初始位置
const sizeWidth = ref(""); // 水平滑块宽度
const sizeHeight = ref(""); // 垂直滑块高度
const ratioX = ref(1); // 水平滑块移动比例
const ratioY = ref(1); // 垂直滑块移动比例

const GAP = 4; // 滑块与边缘的间距
const THRESHOLD = 10; // 溢出阈值

/**
 * 当内容滚动时，计算滚动条应该移动到的位置
 */
const handleScroll = (wrap: HTMLDivElement) => {
  // 计算容器的可视高度和宽度
  const offsetHeight = wrap.offsetHeight - GAP;
  const offsetWidth = wrap.offsetWidth - GAP;


  // 计算滑块应该移动的百分比
  moveY.value = ((wrap.scrollTop * 100) / offsetHeight) * ratioY.value;
  moveX.value = ((wrap.scrollLeft * 100) / offsetWidth) * ratioX.value;

};

const update = () => {
  const wrap = scrollbar?.wrapElement;

  if (!wrap.value) return;

  const wrapEl = wrap.value;

  if (!wrapEl.offsetHeight && !wrapEl.offsetWidth) return;

  // 容器的可视高度和宽度
  const offsetHeight = wrapEl.offsetHeight - GAP;
  const offsetWidth = wrapEl.offsetWidth - GAP;


  // 计算滑块的原始高度和宽度
  const originalHeight = offsetHeight ** 2 / wrapEl.scrollHeight;
  const originalWidth = offsetWidth ** 2 / wrapEl.scrollWidth;

  // 设置最小尺寸限制，大于等于
  const height = Math.max(originalHeight, props.minSize);
  const width = Math.max(originalWidth, props.minSize);

  // 计算滚动比例
  ratioY.value =
    originalHeight /
    (offsetHeight - originalHeight) /
    (height / (offsetHeight - height));
  ratioX.value =
    originalWidth /
    (offsetWidth - originalWidth) /
    (width / (offsetWidth - width));

  // 设置滑块尺寸
  // 只有当需要滚动时才显示滑块
  sizeHeight.value = GAP + height + THRESHOLD < offsetHeight ? `${height}px` : "";
  sizeWidth.value = width + GAP + THRESHOLD < offsetWidth ? `${width}px` : "";

};

/**
 * 点击轨道时，计算应该滚动到的位置
 */
const handleTrackClick = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement;
  const isVertical = target.classList.contains(ns.is("vertical"));

  const wrap = scrollbar?.wrapElement;

  if (!wrap || !wrap.value) return;

  const wrapEl = wrap.value;

  const trackRect = wrapEl.getBoundingClientRect();

  // 计算点击位置相对于轨道的偏移
  const offset = isVertical
    ? e.clientY - trackRect.top
    : e.clientX - trackRect.left;

  // 获取滑块尺寸的一半，因为当点击时，滑块中心需要对齐到点击的位置
  const thumbSize = isVertical
    ? parseFloat(sizeHeight.value)
    : parseFloat(sizeWidth.value);
  const thumbHalf = thumbSize / 2;

  // 计算滑块应该移动到的位置
  const thumbPosition = offset - thumbHalf;

  // 计算滑块位置百分比
  const trackSize = isVertical ? target.offsetHeight : target.offsetWidth;
  const thumbPositionPercentage = (thumbPosition / trackSize) * 100;

  // 计算内容应该滚动到的位置
  const ratio = isVertical ? ratioY.value : ratioX.value;
  const scrollPercentage = thumbPositionPercentage * ratio;

  // 设置滚动位置
  const scrollSize = isVertical ? wrapEl.scrollHeight : wrapEl.scrollWidth;
  const scrollValue = (scrollPercentage * scrollSize) / 100;

  if (isVertical) {
    wrapEl.scrollTop = scrollValue;
  } else {
    wrapEl.scrollLeft = scrollValue;
  }
};

defineExpose({
  handleScroll,
  update,
});
</script>

<template>
  <!-- 轨道容器 -->
  <div v-if="sizeHeight" :class="[ns.e('bar'), ns.is('vertical'), { 'is-always': always }]"
    @mousedown="handleTrackClick">
    <!-- 垂直滚动条 -->
    <Thumb :move="moveY" :ratio="ratioY" :size="sizeHeight" :always="always" vertical @mousedown.stop />
  </div>
  <!-- 轨道容器 -->
  <div v-if="sizeWidth" :class="[ns.e('bar'), ns.is('horizontal'), { 'is-always': always }]"
    @mousedown="handleTrackClick">
    <!-- 水平滚动条 -->
    <Thumb :move="moveX" :ratio="ratioX" :size="sizeWidth" :always="always" @mousedown.stop />
  </div>
</template>
