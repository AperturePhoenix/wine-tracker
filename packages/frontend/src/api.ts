import type { AxiosInstance } from "axios"
import axios from "axios"
import type { Review, ReviewWithUser, User, Wine } from "wine-tracker-models"

type Listener = () => void

interface AuthResponse {
  user: User
  accessToken: string
}

class API {
  constructor() {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      axios
        .post<User>(`${import.meta.env.VITE_BACKEND_URL}auth/getUser`, undefined, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          this.handleResponse(response.data, accessToken)
        })
        .catch(() => {
          localStorage.removeItem("accessToken")
          console.log("Invalid access token")
        })
    }
  }

  listeners = new Set<Listener>()

  client: AxiosInstance = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL })
  user?: User

  login = async (email: string, password: string): Promise<void> => {
    const response = await this.client.post<AuthResponse>("/auth/login", {
      email,
      password,
    })
    const { user, accessToken } = response.data
    this.handleResponse(user, accessToken)
  }

  register = async (newUser: Omit<User, "id">): Promise<void> => {
    const response = await this.client.post<AuthResponse>("/auth/register", newUser)
    const { user, accessToken } = response.data
    this.handleResponse(user, accessToken)
  }

  handleResponse = (user: User, accessToken: string) => {
    this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    localStorage.setItem("accessToken", accessToken)
    this.updateUser(user)
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

export const createReview = async (review: Omit<Review, "id">): Promise<Review> =>
  (await apiInstance.client.post<Review>("/review", review)).data

export const updateReview = async (review: Review): Promise<Review> =>
  (await apiInstance.client.put<Review>(`/review/${review.id}`, review)).data

export const getReviews = async (id: number): Promise<ReviewWithUser[]> =>
  (await apiInstance.client.get<ReviewWithUser[]>(`/wine/${id}/reviews`)).data
