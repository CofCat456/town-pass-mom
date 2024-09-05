export interface APIResponse<T> {
  message: string
  responseObject: T
  statusCode: number
  success: boolean
}

export interface User {
  id: number
  name: string
  email: string
  age: number
  createdAt: string
  updatedAt: string
}
