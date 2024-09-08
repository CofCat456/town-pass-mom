import { acceptHMRUpdate, defineStore } from 'pinia'
import ky from '~/lib/ky'
import type { Meal } from '~/type'

export const useFoodStore = defineStore('food', () => {
  const foodDataList = ref<string[]>([])
  const mealDataList = ref<Meal[]>([])

  async function fetchAllFood() {
    const { meal_names } = await ky.get<{ meal_names: string[] }>(`get_all_meal_names`).json()
    foodDataList.value = meal_names
  }

  async function createFood(data: { user_info_id: string, meal_date: string, meal_name: string }) {
    await ky.post(`create_meal`, {
      json: data,
    }).json()
    fetchAllMeals()
  }

  async function fetchAllMeals() {
    const res = await ky.get<Meal[]>(`get_all_meals`).json()
    mealDataList.value = res
  }

  return {
    foodDataList,
    fetchAllFood,
    fetchAllMeals,
    createFood,
    mealDataList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePrenatalStore as any, import.meta.hot))
