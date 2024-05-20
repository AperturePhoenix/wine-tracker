import { Router } from "express"

import type { Request, Response } from "express"
import { omitPassword, prisma } from "../utils/db"
import { compareSync, genSaltSync, hashSync } from "bcrypt"
import { z } from "zod"
import jwt from "jsonwebtoken"
import type { User } from "@prisma/client"

const router = Router()

const generateAccessToken = (user: User) => {
  return jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: 3600, issuer: "Wine Tracker" })
}

const LoginValidator = z.object({
  email: z.string().email().trim(),
  password: z.string(),
})

router.post("/login", async (req: Request, res: Response) => {
  const { data, error, success } = LoginValidator.safeParse(req.body)
  if (!success) {
    res.status(400).json(error.flatten().fieldErrors)
    return
  }

  // Validate user
  const { email, password } = data
  const user = await prisma.user.findFirstOrThrow({ where: { email } })
  if (!compareSync(password, user.password)) {
    res.status(400).json("Invalid username/password")
    return
  }

  res.status(200).json({ user: omitPassword(user), accessToken: generateAccessToken(user) })
})

const DbUserValidator = z.object({
  id: z.undefined(),
  email: z.string().email().trim(),
  password: z.string().min(4),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
})

router.post("/register", async (req: Request, res: Response) => {
  // Validation
  const { data: reqUser, error, success } = DbUserValidator.safeParse(req.body)
  if (!success) {
    res.status(400).json(error.flatten().fieldErrors)
    return
  }

  // Check if email is already being used
  const userExists = await prisma.user.findFirst({ where: { email: reqUser.email } })
  if (userExists) {
    res.status(400).json({ email: ["Already in use"] })
    return
  }

  // Create user
  const newUser = await prisma.user.create({
    data: {
      ...reqUser,
      password: hashSync(reqUser.password, genSaltSync()),
    },
  })

  // Create access token
  res.status(200).json({ user: omitPassword(newUser), accessToken: generateAccessToken(newUser) })
})

export default router
