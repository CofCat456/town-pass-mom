import { acceptHMRUpdate, defineStore } from 'pinia'
import ky from '~/lib/ky'

const { VITE_APP_USER_ID } = import.meta.env

export const useFoodStore = defineStore('food', () => {
  const foodDataList = ref<any[]>([])

  async function fetchFood() {
    const res = await ky.get<any[]>(`food/user/${VITE_APP_USER_ID}`).json()
    foodDataList.value = res
  }

  return {
    foodDataList,
    fetchFood,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePrenatalStore as any, import.meta.hot))
