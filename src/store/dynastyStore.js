import { defineStore } from 'pinia';

export const useDynastyStore = defineStore('dynasty', {
  state: () => ({
    currentDynasty: '唐朝',
    dynasties: ['秦朝', '汉朝', '唐朝', '宋朝', '元朝', '明朝', '清朝'],
  }),
  actions: {
    setCurrentDynasty(dynasty) {
      this.currentDynasty = dynasty;
    }
  }
});