import { defineStore } from 'pinia';

export interface Title {
  titleNumber: string;
  propertyAddress: string;
  tenure: string;
  x: number;
  y: number;
}

export const useTitleStore = defineStore('title', {
  state: () => ({
    entries: null as Title[] | null,
  }),
  getters: {
    getTitles: (state) => state.entries,
    getTitle: (state) => {
      return (id: string) => state.entries?.find((entry) => entry.titleNumber === id);
    },
  },
});

export default useTitleStore;
