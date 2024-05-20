import { PrismaClient, type User } from "@prisma/client"
import type { User as WineUser } from "wine-tracker-models"

export const prisma = new PrismaClient({ errorFormat: "minimal" })

export const omitPassword = (user: User) => {
  const { password, ...cleanUser } = user
  return cleanUser satisfies WineUser
}
