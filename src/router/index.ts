import { createRouter, createWebHistory } from 'vue-router';
import TitlesList from '@/views/Titles/TitlesList.vue';
import TitlesEntry from '@/views/Titles/TitlesEntry.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: TitlesList,
    },
    {
      path: '/titles',
      name: 'Titles List',
      component: TitlesList,
    },
    {
      path: '/titles/:id',
      name: 'Titles Entry',
      component: TitlesEntry,
    },
  ],
});

export default router;
