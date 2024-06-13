import type { AxiosInstance } from "axios"
import axios from "axios"
import type { User, Wine } from "wine-tracker-models"

type Listener = () => void

class API {
  listeners = new Set<Listener>()

  client: AxiosInstance = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL })
  user?: User

  login = async (email: string, password: string): Promise<void> => {
    const response = await this.client.post<{ user: User; accessToken: string }>("/auth/login", {
      email,
      password,
    })

    const { user, accessToken } = response.data
    this.updateUser(user)
    this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  }

  register = async (newUser: Omit<User, "id">): Promise<void> => {
    const response = await this.client.post<{ user: User; accessToken: string }>("/auth/register", newUser)

    const { user, accessToken } = response.data
    this.updateUser(user)
    this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  }

  subscribe = (listener: Listener) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  updateUser = (newUser: User) => {
    if (JSON.stringify(this.user) !== JSON.stringify(newUser)) {
      this.user = newUser
      for (const listener of this.listeners) listener()
    }
  }
}

const apiInstance = new API()
export default apiInstance

export const createWine = async (wine: Omit<Wine, "id">): Promise<Wine> =>
  (await apiInstance.client.post<Wine>("/wine", wine)).data

export const getWines = async (): Promise<Wine[]> => (await apiInstance.client.get<Wine[]>("/wine")).data
