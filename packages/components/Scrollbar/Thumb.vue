<script lang="ts" setup>
import { inject } from "vue";
import { computed } from "vue";
import { thumbProps } from "./types";
import { scrollbarContextKey } from "./constants";

const props = defineProps(thumbProps);

const scrollbar = inject(scrollbarContextKey);

let cursorDown = false; // 是否正在拖拽
let startPosition = 0; // 鼠标起始位置
let startOffset = 0; // 滑块起始位置

const thumbStyle = computed(() => {
  if (props.vertical) {
    return {
      height: props.size,
      transform: `translateY(${props.move}%)`,
    };
  } else {
    return {
      width: props.size,
      transform: `translateX(${props.move}%)`,
    };
  }
});

/**
 * 按下开始手动拖拽
 */
const handleMouseDown = (e: MouseEvent) => {
  e.stopPropagation(); // 阻止事件冒泡
  e.preventDefault(); // 阻止默认行为

  // 只响应鼠标左键
  if (e.ctrlKey || [1, 2].includes(e.button)) return;

  cursorDown = true;
  startPosition = props.vertical ? e.clientY : e.clientX;

  // 计算滑块当前的偏移量
  const thumb = e.currentTarget as HTMLElement;
  const thumbReact = thumb.getBoundingClientRect();
  startOffset = props.vertical
    ? e.clientY - thumbReact.top
    : e.clientX - thumbReact.left;

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  // 禁止文本选择
  document.onselectstart = () => false;
};

/**
 * 鼠标移动，更新滑块位置和内容滚动
 */
const handleMouseMove = (e: MouseEvent) => {
  if (!cursorDown) return;
  if (!scrollbar?.wrapElement) return;

  const wrapEl = scrollbar.wrapElement.value; // 滚动内容容器
  const bar = wrapEl.parentElement; // 滚动条轨道容器

  if (!bar) return;

  const currentPostiion = props.vertical ? e.clientY : e.clientX;

  // 计算鼠标相对于 Bar 容器的位置
  const barRect = bar.getBoundingClientRect();
  const offset = props.vertical
    ? currentPostiion - barRect.top
    : currentPostiion - barRect.left;

  // 得到滑块应该的位置
  const thumbPosition = offset - startOffset;

  // 滑块位置百分比
  const barSize = props.vertical ? bar.offsetHeight : bar.offsetWidth;

  const thumbPositionPercentage = (thumbPosition / barSize) * 100;

  // 计算内容应该滚动到的位置
  const scrollPercentage = thumbPositionPercentage * (props.ratio || 1);

  // 转换为像素值并设置滚动位置
  const scrollSize = props.vertical ? wrapEl.scrollHeight : wrapEl.scrollWidth;
  const scrollValue = (scrollPercentage * scrollSize) / 100;

  // 内容滚动的位置
  if (props.vertical) {
    wrapEl.scrollTop = scrollValue;
  } else {
    wrapEl.scrollLeft = scrollValue;
  }
};

const handleMouseUp = () => {
  cursorDown = false;

  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);

  document.onselectstart = null;
};
</script>

<template>
  <div :class="['er-scrollbar__thumb', { 'is-vertical': vertical }]" :style="thumbStyle" @mousedown="handleMouseDown">
  </div>
</template>
