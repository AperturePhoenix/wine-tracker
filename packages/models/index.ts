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
  firstName: string
  lastName: string
}

/** https://developer.mozilla.org/en-US/docs/Glossary/Primitive */
export type Primitive = string | number | bigint | boolean | undefined | symbol | null

export type ErrorResponse<T> = { [K in keyof T]?: T[K] extends Primitive | Array<any> ? string : ErrorResponse<T[K]> }
