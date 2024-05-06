import type { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import type { ErrorResponse, DB_User, User } from "wine-tracker-models"
import { genSaltSync, hashSync} from "bcrypt"

export function login(req: Request, res: Response) {
  res.send("This is the login endpoint")
}

export async function register(req: Request, res: Response) {
  const user: DB_User = req.body

  // validation
  const errors: ErrorResponse<DB_User> = {}
  // TODO: use validation framework
  if (!user.id) errors.id = "Unknown property"
  if (!user.email) errors.email = "This field is required"
  if (!(user.email.includes("@") && user.email.includes("."))) errors.email = "Invalid email address"
  if (!user.password) errors.password = "This field is required"
  if (!user.firstName) errors.firstName = "This field is required"
  if (!user.lastName) errors.lastName = "This field is required"

  if (Object.keys(errors).length > 0) res.status(400).json(errors)

  // Create user
  const prisma = new PrismaClient()
  const dbUser = await prisma.user.create({
    data: {
      ...user,
      password: hashSync(user.password, genSaltSync(10))
    },
  })
  await prisma.$disconnect()

  const { password, ...responseUser } = dbUser
  res.status(200).json(responseUser satisfies User)
}
