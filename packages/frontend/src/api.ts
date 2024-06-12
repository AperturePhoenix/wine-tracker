import type { AxiosInstance } from "axios"
import axios from "axios"
import type { User } from "wine-tracker-models"

export default class API {
  private static _instance: API

  private client: AxiosInstance
  private user?: User
  private accessToken?: string

  private constructor() {
    this.client = axios.create()
  }

  static getInstance(): API {
    if (!API._instance) API._instance = new API()
    return API._instance
  }

  async login(email: string, password: string): Promise<void> {
    const response = await axios.post<{ user: User; accessToken: string }>("http://localhost:3000/auth/login", {
      email,
      password,
    })

    const { user, accessToken } = response.data
    this.user = user
    this.accessToken = accessToken
    this.client.defaults.headers.common.Authorization = `Bearer ${this.accessToken}`
  }
}
