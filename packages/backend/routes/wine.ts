import { type Request, type Response, Router } from "express"
import z from "zod"
import type { Wine } from "wine-tracker-models"
import { prisma } from "../utils/db"

const WineValidator = z.object({
  name: z.string().min(3).trim(),
  brand: z.string().min(3).trim(),
  year: z.number().nullable().optional(),
  type: z.string().trim().nullable().optional(),
  alcoholContent: z.number().nullable().optional(),
  region: z.string().trim().nullable().optional(),
  country: z.string().trim().nullable().optional(),
  description: z.string().trim().nullable().optional(),
  image: z.string().trim().nullable().optional(),
})

const router = Router()

router.get("", async (req: Request, res: Response) => {
  const wines = await prisma.$queryRaw`select w.id, w.name, w.brand, w.year, w.type, w."alcoholContent", w.region, w.country, w.description, w.image, avg(r.rating) as rating 
    from "Wine" w 
    left join "Review" r on r."wineId" = w.id 
    group by w.id`
  res.status(200).json(wines)
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

router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    res.status(200).json("id must be a number")
    return
  }

  const wine = await prisma.wine.findFirst({ where: { id } })
  res.status(wine ? 200 : 404).json(wine)
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

router.get("/:id/reviews", async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    res.status(200).json("id must be a number")
    return
  }

  const reviews = await prisma.$queryRaw`select r.id, r."userId",  r.rating, r."wouldBuyAgain", r.sweetness, r.notes, u."firstName", u."lastName" from "Review" r 
    right join "User" u on r."userId" = u.id`
  res.status(200).json(reviews)
})

export default router
