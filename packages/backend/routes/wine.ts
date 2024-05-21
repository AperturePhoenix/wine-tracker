import { type Request, type Response, Router } from "express"
import z from "zod"
import type { Wine } from "wine-tracker-models"
import { prisma } from "../utils/db"

const WineValidator = z.object({
  name: z.string().trim(),
  brand: z.string().trim(),
  year: z.number().nullable().optional(),
  type: z.string().trim().nullable().optional(),
  alcoholContent: z.number().nullable().optional(),
  region: z.string().trim().nullable().optional(),
  country: z.string().trim().nullable().optional(),
  description: z.string().trim().nullable().optional(),
  image: z.string().trim().nullable().optional(),
})

const router = Router()

router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    res.status(200).json("id must be a number")
    return
  }

  const wine = await prisma.wine.findFirst({ where: { id } })
  res.status(wine ? 200 : 404).json(wine)
})

router.post("", async (req: Request, res: Response) => {
  const { data, error, success } = WineValidator.safeParse(req.body)
  if (!success) {
    res.status(400).json(error.flatten().fieldErrors)
    return
  }

  const wine = await prisma.wine.create({ data })
  res.status(200).json(wine satisfies Wine)
})

router.put("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    res.status(200).json("id must be a number")
    return
  }

  const { data, error, success } = WineValidator.safeParse(req.body)
  if (!success) {
    res.status(400).json(error.flatten().fieldErrors)
    return
  }

  const wine = await prisma.wine.update({
    where: { id },
    data: {
      year: null,
      type: null,
      alcoholContent: null,
      region: null,
      country: null,
      description: null,
      image: null,
      ...data,
    },
  })
  res.status(200).json(wine satisfies Wine)
})

export default router
