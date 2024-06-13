import { useSyncExternalStore } from "react"
import apiInstance from "./api"
import type { User } from "wine-tracker-models"

export const useUser = (): User | undefined => useSyncExternalStore(apiInstance.subscribe, () => apiInstance.user)
