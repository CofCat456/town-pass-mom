import { acceptHMRUpdate, defineStore } from 'pinia'
import ky from '~/lib/ky'

export const useDataStore = defineStore('data', () => {
  const data = ref([])

  async function fetchData() {
    const user = await ky.get('users')
    console.log(user)
  }

  return {
    data,
    fetchData,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDataStore as any, import.meta.hot))
