import express, { type NextFunction, type Request, type Response, json } from "express"
import authRoutes from "./routes/auth"

const app = express()
const port = 3000

// middlewares
app.use(json())

// routes
app.use("/auth", authRoutes)

// Error handler must be last`
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json(err)
})

app.listen(port, () => {
  console.log(`Wine Tracker Server listening on ${port}`)
})
