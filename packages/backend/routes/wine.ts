import { type Request, type Response, Router } from "express"
import z from "zod"
import type { Wine } from "wine-tracker-models"
import { prisma } from "../utils/db"

const CreateWineValidator = z.object({
  name: z.string().trim(),
  brand: z.string().trim(),
  year: z.number().optional(),
  type: z.string().trim().optional(),
  alcoholContent: z.number().optional(),
  region: z.string().trim().optional(),
  country: z.string().trim().optional(),
  description: z.string().trim().optional(),
  image: z.string().trim().optional(),
})

const router = Router()

// router.get("", read)

router.post("", async (req: Request, res: Response) => {
  const { data, error, success } = CreateWineValidator.safeParse(req.body)
  if (!success) {
    res.status(400).json(error.flatten().fieldErrors)
    return
  }

  const wine = await prisma.wine.create({ data })
  res.status(200).json(wine satisfies Wine)
})

// router.put("", update)

export default router
