import { type Request, type Response, Router } from "express"
import z from "zod"
import { prisma } from "../utils/db"
import { requireAuth } from "../middlewares"
import type { Review } from "wine-tracker-models"

const ReviewValidator = z.object({
  wineId: z.number(),
  rating: z.number().min(1).max(10),
  wouldBuyAgain: z.boolean(),
  sweetness: z.number().min(1).max(10),
  notes: z.string().trim().optional(),
})

const router = Router()

router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    res.status(200).json("id must be a number")
    return
  }

  const review = await prisma.review.findFirst({ where: { id } })
  res.status(review ? 200 : 404).json(review)
})

router.post("", requireAuth, async (req: Request, res: Response) => {
  const { data, error, success } = ReviewValidator.safeParse(req.body)
  if (!success) {
    res.status(400).json(error.flatten().fieldErrors)
    return
  }

  if (await prisma.review.findFirst({ where: { userId: req.session.userId, wineId: data.wineId } })) {
    res.status(400).json("Review already exists. Please update it instead")
    return
  }
  const review = await prisma.review.create({ data: { ...data, userId: req.session.userId } })
  res.status(200).json(review satisfies Review)
})

router.put("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    res.status(200).json("id must be a number")
    return
  }

  const { data, error, success } = ReviewValidator.safeParse(req.body)
  if (!success) {
    res.status(400).json(error.flatten().fieldErrors)
    return
  }

  const review = await prisma.review.update({
    where: { id },
    data: {
      ...data,
    },
  })
  res.status(200).json(review satisfies Review)
})

export default router
