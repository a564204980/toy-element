<template>
  <div>
    <er-dropdown :items="menuItems" command="click">
      <er-button>操作菜单</er-button>
    </er-dropdown>
  </div>
</template>

<script setup lang="ts">
const menuItems = [
  { label: "编辑", command: "edit" },
  { label: "复制", command: "copy" },
  { label: "删除", command: "delete", divided: true, disabled: true },
];
</script>

<style scoped></style>
