<script setup lang="ts">
type TableColumn = {
  label: string;
};

const props = defineProps<TableColumn>();
</script>

<template>
  <td class="p-4 w-1/2">
    {{ props.label }}
  </td>
</template>
