<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useTitleStore } from '@/stores/title';
import { useRouter } from 'vue-router';
import TableRow from '@/components/Table/TableRow.vue';

const router = useRouter();

const storeTitle = useTitleStore();
const { getTitles } = storeToRefs(storeTitle);

const currentPage = ref(0);

const triggerReverese = ref(false);

/**
 * Chunks entries to separate pages
 * @param inputArray Array of entry objects
 * @param entriesPerPage Number of entries per page
 * @returns Chunked Array
 */
function setEntries(inputArray: [], entriesPerPage: number) {
  if (!Array.isArray(inputArray)) return;
  const result = [];

  for (let i = 0; i < inputArray.length; i += entriesPerPage) {
    const chunk = inputArray.slice(i, i + entriesPerPage);
    result.push(chunk);
  }

  return result;
}

/**
 * Handles Navigation of page
 * @param direction String either 'next' or 'previous'
 */
function handleNavigatePage(direction: string) {
  if (direction === 'next') {
    if (currentPage.value < (paginateTitles.value ? paginateTitles.value.length - 1 : 0)) currentPage.value++;
  } else {
    if (currentPage.value === 0) return;
    currentPage.value--;
  }
}

/**
 * Routes to specific title entry
 * @param id String of title number
 */
function handleTitle(id: string) {
  router.push(`/titles/${id}`);
}

function compareTitleNumber(a: any, b: any) {
  const titleA = a['titleNumber'].toUpperCase();
  const titleB = b['titleNumber'].toUpperCase();

  let comparison = 0;
  if (titleA > titleB) {
    comparison = 1;
  } else if (titleA < titleB) {
    comparison = -1;
  }
  return comparison;
}

function sortEntries(arrayToSort: [], reverse = false) {
  if (!Array.isArray(arrayToSort)) return;
  return reverse ? arrayToSort.sort(compareTitleNumber).reverse() : arrayToSort.sort(compareTitleNumber);
}

function handleOnClick(id: string) {
  handleTitle(id);
}

const sortedEntries = computed(() => sortEntries(getTitles.value as [], triggerReverese.value));

const paginateTitles = computed(() => setEntries(sortedEntries.value as [], 5));
const numberOfPages = computed(() => (paginateTitles.value ? paginateTitles.value.length : null));
</script>

<template>
  <div v-if="paginateTitles">
    <table class="table-auto w-full">
      <thead>
        <tr class="bg-blue-600 text-white font-semibold">
          <th class="text-left p-4">
            Title number
            <font-awesome-icon
              v-if="triggerReverese"
              icon="fa-solid fa-arrow-down-a-z"
              class="cursor-pointer"
              @click="triggerReverese = !triggerReverese"
            />
            <font-awesome-icon
              v-else
              icon="fa-solid fa-arrow-up-a-z"
              class="cursor-pointer"
              @click="triggerReverese = !triggerReverese"
            />
          </th>
          <th class="text-left p-4">Class of title</th>
        </tr>
      </thead>
      <tbody>
        <TableRow
          :id="`titleNumber`"
          :entries="paginateTitles[currentPage]"
          :column-keys="['titleNumber', 'tenure']"
          @on-click="handleOnClick"
        ></TableRow>
      </tbody>
    </table>
  </div>
  <div class="flex flex-col py-8">
    <div class="flex justify-center">
      <button
        class="p-4 bg-blue-500 mr-4 text-white"
        @click="handleNavigatePage('previous')"
        :class="[currentPage === 0 ? 'bg-gray-400' : '']"
      >
        Previous Page
      </button>
      <button
        class="p-4 bg-blue-500 text-white"
        :class="[currentPage === numberOfPages ? 'bg-gray-400' : '']"
        @click="handleNavigatePage('next')"
      >
        Next Page
      </button>
    </div>
    <div class="text-center py-8">Page: {{ currentPage + 1 }} of {{ numberOfPages }}</div>
  </div>
</template>
