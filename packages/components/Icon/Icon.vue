<script lang="ts" setup>
import type { IconProps } from "./types";
import { computed } from "vue";
import { omit } from "lodash-es";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineOptions({
  name: "ErIcon",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<IconProps>(), {
  type: "info",
  rotateBy: false,
});

const filterProps = computed(() => {
  return omit(props, ["type", "color"]);
});
const customeStyles = computed(() => ({ color: props.color ?? void 0 }));
</script>

<template>
  <i
    class="er-icon"
    :class="[`er-icon--${type}`]"
    :style="customeStyles"
    v-bind="$attrs"
  >
    <FontAwesomeIcon v-bind="filterProps"></FontAwesomeIcon>
  </i>
</template>

<style scoped>
@import "./style.scss";
</style>
