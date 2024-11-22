import type { AxiosRequestConfig } from 'axios'

export interface Resource<T> {
  resource: T
}

export interface Resources<T = any> {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
  }
}

export interface User {
  id: number
  username: string
  email: string
}

export type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue }
