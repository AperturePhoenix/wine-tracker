import express, { type NextFunction, type Request, type Response, json } from "express"
import authRoutes from "./routes/auth"
import wineRoutes from "./routes/wine"
import reviewRoutes from "./routes/review"

const app = express()
const port = 3000

// middlewares
app.use(json())

// routes
app.use("/auth", authRoutes)
app.use("/wine", wineRoutes)
app.use("/review", reviewRoutes)

// Error handler must be last`
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json(err)
})

app.listen(port, () => {
  console.log(`Wine Tracker Server listening on ${port}`)
})
