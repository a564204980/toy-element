<template>
  <ErTooltip ref="tooltipRef" trigger="click" :hidden-timeout="hideAfter">
    <template #content>
      <div class="er-popconfirm" :style="style">
        <div class="er-popconfirm__icon">
          <ErIcon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
          {{ title }}
        </div>
        <div class="er-popconfirm__action">
          <ErButton size="small" :type="cancelButtonType">{{
            cancelButtonText
          }}</ErButton>
          <ErButton size="small" :type="confirmButtonType">{{
            confirmButtonText
          }}</ErButton>
        </div>
      </div>
    </template>

    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>

    <template v-if="$slots.reference" #default>
      <slot name="reference"></slot>
    </template>
  </ErTooltip>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { addUnit } from "@toy-element-clone/utils";
import type { TooltipInstance } from "../Tooltip";
import type { PopconfirmProps, PopconfirmEmits } from "./types.ts";

import ErIcon from "../Icon/Icon.vue";
import ErButton from "../Button/Button.vue";
import ErTooltip from "../Tooltip/Tooltip.vue";

defineOptions({
  name: "ErPopconfirm",
});

const emits = defineEmits<PopconfirmEmits>();

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: "",
  confirmButtonType: "primary",
  confirmButtonText: "确定",
  cancelButtonText: "取消",
  icon: "question-circle",
  iconColor: "#f90",
  hideAfter: 200,
  width: 150,
});

const tooltipRef = ref<TooltipInstance>();

const style = computed(() => {
  return {
    width: addUnit(props.width),
  };
});
</script>
