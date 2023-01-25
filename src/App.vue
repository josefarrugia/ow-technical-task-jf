<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useTitleStore } from '@/stores/title';
import { onBeforeMount } from 'vue';
import HeaderBar from './components/Core/HeaderBar.vue';
import camelcaseKeys from 'camelcase-keys';

const storeTitles = useTitleStore();

const getTitlesData = async () => {
  return await fetch('https://owfetechtask.blob.core.windows.net/titledata/testdata.json')
    .then((res) => res.json())
    .then((data) => (storeTitles.$state.entries = camelcaseKeys(data)))
    .catch((error) => {
      console.error('Problem: \n', error);
    });
};

onBeforeMount(() => {
  getTitlesData();
});
</script>

<template>
  <HeaderBar />

  <main class="container mx-auto">
    <RouterView />
  </main>
</template>
