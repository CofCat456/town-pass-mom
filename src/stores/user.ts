import { acceptHMRUpdate, defineStore } from 'pinia'
import ky from '~/lib/ky'

import type { User } from '~/type'

const { VITE_APP_USER_ID } = import.meta.env

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  async function fetchUser() {
    const res = await ky.get<User>(`userinfo/${VITE_APP_USER_ID}`).json()
    user.value = res
  }

  return {
    user,
    fetchUser,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
