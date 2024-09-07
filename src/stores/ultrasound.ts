import { acceptHMRUpdate, defineStore } from 'pinia'
import ky from '~/lib/ky'

import type { Ultrasound } from '~/type'

const { VITE_APP_USER_ID } = import.meta.env

export const useUltrasoundStore = defineStore('ultrasound', () => {
  const ultransoundDataList = ref<Ultrasound[]>([])

  async function fetchUltrasound() {
    const res = await ky.get<Ultrasound[]>(`ultrasound/user/${VITE_APP_USER_ID}`).json()
    ultransoundDataList.value = res
  }

  async function updateUltrasound(data: Ultrasound) {
    await ky.put(`ultrasound/${data.id}`, { json: data })
    await fetchUltrasound()
  }

  return {
    ultransoundDataList,
    fetchUltrasound,
    updateUltrasound,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUltrasoundStore as any, import.meta.hot))
