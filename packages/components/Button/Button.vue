<script setup lang="ts">
import { computed, ref } from "vue";
import { throttle } from "lodash-es";
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import ErIcon from "../Icon/Icon.vue";

defineOptions({
  name: "ErButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
  useThrottle: true,
  throttleDuration: 1000,
});

const emits = defineEmits<ButtonEmits>();

const slots = defineSlots();

const _ref = ref<HTMLButtonElement>();

const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0px",
}));

const handleBtnClick = (e: MouseEvent) => emits("click", e);
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration);

defineExpose<ButtonInstance>({
  ref: _ref,
});
</script>

<template>
  <component
    ref="_ref"
    class="er-button"
    :is="tag"
    :autofocus="autofocus"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      [`er-button--${type}`]: type,
      [`er-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    @click="(e:MouseEvent) => useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)"
  >
    <template v-if="loading">
      <slot name="loading">
        <er-icon
          spin
          class="loading-icon"
          size="1x"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
        ></er-icon>
      </slot>
    </template>

    <er-icon
      v-if="icon && !loading"
      size="1x"
      :icon="icon"
      :style="iconStyle"
    ></er-icon>
    <slot></slot>
  </component>
</template>

<style scoped>
@import "./style.css";
</style>
