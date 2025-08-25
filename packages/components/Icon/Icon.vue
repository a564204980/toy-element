<template>
  <i
    class="er-icon"
    :class="[`er-icon--${props.type}`]"
    :style="customStyles"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<script lang="ts" setup>
import type { IconProps } from "./type.ts";
import { computed } from "vue";
import { omit } from "lodash-es";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineOptions({
  name: "ErIcon",
  inheritAttrs: false, // 关闭透传
});

const props = defineProps<IconProps>();

/**
 * 过滤props，移除type和color
 */
const filterProps = computed(() => omit(props, ["type", "color"]));

const customStyles = computed(() => ({ color: props.color ?? void 0 }));
</script>

<style >
@import "./style.css";
</style>
