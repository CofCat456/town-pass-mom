import { acceptHMRUpdate, defineStore } from 'pinia'
import ky from '~/lib/ky'

import type { Prenatal } from '~/type'

const { VITE_APP_USER_ID } = import.meta.env

export const usePrenatalStore = defineStore('prenatal', () => {
  const prenatalDataList = ref<Prenatal[]>([])

  async function fetchPrenatal() {
    const res = await ky.get<Prenatal[]>(`prenatal_checkup/user/${VITE_APP_USER_ID}`).json()
    prenatalDataList.value = res.sort((a, b) => new Date(Number(b.examination_start_date)).getTime() - new Date(Number(a.examination_start_date)).getTime())
  }

  async function updatePrenatal(data: Prenatal) {
    await ky.put(`prenatal_checkup/${data.id}`, { json: data })
    await fetchPrenatal()
  }

  return {
    prenatalDataList,
    fetchPrenatal,
    updatePrenatal,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePrenatalStore as any, import.meta.hot))
