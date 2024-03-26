import { defineStore } from "pinia";

export const useCounter = defineStore("counter", {
  state: () => {
    return { count: 0 };
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
