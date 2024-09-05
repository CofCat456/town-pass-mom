import { acceptHMRUpdate, defineStore } from 'pinia'
import ky from '~/lib/ky'

import type { User } from '~/type'

export const useDataStore = defineStore('data', () => {
  const users = ref<(User[])>([])

  async function fetchData() {
    const { responseObject } = await ky.get<User[]>('users')
    users.value = responseObject
  }

  return {
    users,
    fetchData,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDataStore as any, import.meta.hot))
