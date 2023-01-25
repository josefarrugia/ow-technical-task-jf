<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTitleStore } from '@/stores/title';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import GoogleMap from '@/components/GoogleMap/GoogleMap.vue';

const route = useRoute();

const storeTitle = useTitleStore();
const { getTitle } = storeToRefs(storeTitle);

const titleEntry = computed(() => getTitle.value(route.params.id as string));
</script>

<template>
  <div v-if="titleEntry" class="grid gap-4 grid-cols-1 sm:grid-cols-2">
    <div>
      <div class="flex justify-between sm:justify-start">
        <div>
          <h1 class="inline-block text-2xl font-semibold mb-8">{{ titleEntry.titleNumber }}</h1>
        </div>
        <div class="sm:ml-4">
          <span class="inline-block text-right rounded-3xl bg-blue-500 py-2 px-4 text-white">{{
            titleEntry.tenure
          }}</span>
        </div>
      </div>
      <div class="sm:w-3/4 mb-4">
        <span class="font-semibold">Address:</span>
        <address>
          {{ titleEntry.propertyAddress }}
        </address>
      </div>
      <p class="sm:w-3/4">Type: {{ titleEntry.tenure }}</p>
    </div>
    <div class="">
      <GoogleMap :lat="titleEntry.y" :long="titleEntry.x" :zoom="16" />
    </div>
  </div>
</template>
