<template>
  <ErTooltip ref="tooltipRef" trigger="click" :hidden-timeout="hideAfter">
    <template #content>
      <div class="er-popconfirm" :style="style">
        <div class="er-popconfirm__icon">
          <ErIcon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
          {{ title }}
        </div>
        <div class="er-popconfirm__action">
          <ErButton size="small" :type="cancelButtonType" @click="cancel">{{
            cancelButtonText || t("popconfirm.cancelButtonText")
          }}</ErButton>
          <ErButton size="small" :type="confirmButtonType" @click="confrim">{{
            confirmButtonText || t("popconfirm.confirmButtonText")
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
import { useLocale } from "@toy-element-clone/hooks";

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

const { t } = useLocale();

// 隐藏提示框
const hidePopper = () => {
  tooltipRef.value?.hide();
};

const confrim = (e: MouseEvent) => {
  emits("confrim", e);
  hidePopper();
};

const cancel = (e: MouseEvent) => {
  emits("cancel", e);
  hidePopper();
};
</script>

<style scoped>
@import "./style.css";
</style>
