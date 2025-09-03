<template>
  <transition name="er-alert-fade">
    <div
      v-show="visible"
      class="er-alert"
      role="alert"
      :class="{
        [`er-alert__${type}`]: type,
        [`er-alert__${effect}`]: effect,
        'text-center': center,
      }"
    >
      <er-icon
        v-if="showIcon"
        class="er-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      ></er-icon>
      <div class="er-alert__content">
        <span
          class="er-alert__title"
          :class="{ 'width-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="er-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="er-alert__close" v-if="closeable">
          <er-icon @click.stop="close" icon="xmark"></er-icon>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { typeIconMap } from "@toy-element-clone/utils";
import type { AlertProps, AlertEmits, AlertInstance } from "./types.ts";

defineOptions({
  name: "ErAlert",
});

const props = withDefaults(defineProps<AlertProps>(), {
  type: "info",
  effect: "light",
  closeable: true,
});

const emits = defineEmits<AlertEmits>();
const slots = defineSlots();

const visible = ref(true);

const iconName = computed(() => {
  console.log("props", props.type);
  return typeIconMap.get(props.type) ?? "circle-info";
});
const withDescription = computed(() => props.description || slots.default);

console.log("slots", slots.default());

console.log("iconName", iconName.value);

const open = () => {
  visible.value = true;
};
const close = () => {
  visible.value = false;
  emits("close");
};

defineExpose({
  open,
  close,
});
</script>
