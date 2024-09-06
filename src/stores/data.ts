import { acceptHMRUpdate, defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDataStore as any, import.meta.hot))
