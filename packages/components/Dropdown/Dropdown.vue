<template>
  <div class="er-dropdown" :class="{ 'is-disabled': props.disabled }">
    <er-tooltip
      ref="tooltipRef"
      v-bind="tooltipProps"
      :virtual-triggering="splitButton"
      :virtual-ref="triggerRef"
      @visible-change="$emit('visible-change', $event)"
    >
      <er-button-group
        v-if="splitButton"
        :size="size"
        :type="type"
        :disabled="disabled"
      >
        <er-button @click="$emit('click', $event)">
          <slot name="default"></slot>
        </er-button>
        <er-button ref="triggerRef" icon="angle-down"></er-button>
      </er-button-group>
      <slot v-else name="default"></slot>

      <template #content>
        <ul class="er-dropdown__menu">
          <slot name="dropdown">
            <!-- 插槽的默认内容 -->
            <template v-for="item in items" :key="item.command">
              <!-- 可以使用DropdwonItem传递自定义的场景 -->
              <DropdwonItem v-bind="item"></DropdwonItem>
            </template>
          </slot>
        </ul>
      </template>
    </er-tooltip>
  </div>
</template>

<script setup lang="ts">
import { useDisabledStyle } from "@toy-element-clone/hooks";
import { omit, isNil } from "lodash-es";
import { ref, computed, provide } from "vue";
import { DROPDOWN_CTX_KEY } from "./constants.ts";
import type { TooltipInstance } from "../Tooltip/types.ts";
import {
  type ButtonInstance,
  ErButton,
  ErButtonGroup,
} from "../Button/index.ts";
import type {
  DropdownProps,
  DropdownEmits,
  DropdownInstance,
  DropdownContext,
  DropdownItemProps,
} from "./types.ts";

import ErTooltip from "../Tooltip/Tooltip.vue";
import DropdwonItem from "./DropdownItem.vue";

defineOptions({
  name: "ErDropdown",
  inheritAttrs: false, // 关闭透传
});

const props = withDefaults(defineProps<DropdownProps>(), {
  hideOnClick: true,
  items: () => [] as DropdownItemProps[], // 每次调用都会返回新的数组
});

const emits = defineEmits<DropdownEmits>();
const slots = defineSlots();

const triggerRef = ref<ButtonInstance>();
const tooltipRef = ref<TooltipInstance>();

const tooltipProps = computed(() =>
  omit(props, ["type", "size", "items", "hideOnClick", "splitButton"])
);

useDisabledStyle();

/**
 * 下拉列表项点击事件
 * @param e 下拉列表项的属性
 */
const handleItemClick = (e: DropdownItemProps) => {
  props.hideOnClick && tooltipRef.value?.hide();
  !isNil(e.command) && emits("command", e.command);
};

provide<DropdownContext>(DROPDOWN_CTX_KEY, {
  handleItemClick,
  size: computed(() => props.size),
});

defineExpose<DropdownInstance>({
  open() {
    tooltipRef.value?.show();
  },
  close() {
    tooltipRef.value?.hide();
  },
});
</script>

<style scoped>
@import "./style.css";

:deep(.er-button-group) {
  & > :last-child {
    padding: 5px 7px;
  }
}
</style>
