import type { Request, Response } from "express"
import { prisma } from "../../utils/db"
import type { User } from "wine-tracker-models"
import { genSaltSync, hashSync } from "bcrypt"
import { z } from "zod"

export function login(req: Request, res: Response) {
  res.send("This is the login endpoint")
}

const DbUserValidator = z.object({
  id: z.undefined(),
  email: z.string().email().trim(),
  password: z.string().trim().min(4),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
})

export async function register(req: Request, res: Response) {
  // Validation
  const { data: reqUser, error, success} = DbUserValidator.safeParse(req.body)
  if (!success)
    return res.status(400).json(error.flatten().fieldErrors)

  // Check if email is already being used
  const userExists = await prisma.user.findFirst({ where: { email: reqUser.email }})
  if (userExists) return res.status(400).json({ email: ["Already in use"] })

  // Create user
  const newUser = await prisma.user.create({
    data: {
      ...reqUser,
      password: hashSync(reqUser.password, genSaltSync(10)),
    },
  })
  await prisma.$disconnect()

  // Return created user
  const { password, ...responseUser } = newUser
  res.status(200).json(responseUser satisfies User)
}
