<script setup lang="ts">
import TableColumn from './TableColumn.vue';

const emit = defineEmits(['onClick']);

function handleOnClick(id: string | number) {
  emit('onClick', id);
}

type TableRow = {
  id: string | number;
  entries: any[];
  columnKeys: any[];
};

const props = defineProps<TableRow>();
</script>

<template>
  <tr
    v-for="(entry, index) in props.entries"
    :key="index"
    class="even:bg-blue-200 scale-100 hover:scale-105 transform-gpu transition cursor-pointer hover:bg-gray-600 hover:text-white drop-shadow-none hover:drop-shadow-xl"
    @click="handleOnClick(entry[props.id])"
  >
    <TableColumn v-for="(columnKey, index) in props.columnKeys" :key="index" :label="entry[columnKey]" />
  </tr>
</template>
