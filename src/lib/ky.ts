import kyStandard from 'ky'

import type { Options } from 'ky'
import type { APIResponse } from '~/type'

const { VITE_API_BASE_URL } = import.meta.env

function createTypedKyInstance(options?: Options) {
  const instance = kyStandard.create(options)

  return {
    get: <T>(url: string, options?: Options) =>
      instance.get(url, options).json<APIResponse<T>>(),
    post: <T>(url: string, options?: Options) =>
      instance.post(url, options).json<APIResponse<T>>(),
  }
}

export default createTypedKyInstance({
  prefixUrl: VITE_API_BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
})
