export interface DB_User {
  id: number
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface User {
  id: number
  email: string
  password?: null
  firstName: string
  lastName: string
}

export interface Wine {
  id: number
  name: string
  brand: string
  year?: number | null
  type?: string | null
  alcoholContent?: number | null
  region?: string | null
  country?: string | null
  description?: string | null
  image?: string | null
  rating?: number
}

export interface Review {
  id: number
  userId: number
  wineId: number
  rating: number
  wouldBuyAgain: boolean
  sweetness: number
  notes?: string | null
}

/** https://developer.mozilla.org/en-US/docs/Glossary/Primitive */
export type Primitive = string | number | bigint | boolean | undefined | symbol | null

export type ErrorResponse<T> = { [K in keyof T]?: T[K] extends Primitive | Array<any> ? string : ErrorResponse<T[K]> }

export type FormTypes<T, E = object> = { [Key in keyof T]-?: E & { value: T[Key] } }
