<template>
  <slot name="default" :config="config"></slot>
</template>

<script lang="ts" setup>
import type { ConfigProviderProps } from "./types";
import { provideGlobalConfig } from "./hooks";

defineOptions({
  name: "ErConfigProvider",
});

const props = defineProps<ConfigProviderProps>();
const config = provideGlobalConfig(props);
</script>
