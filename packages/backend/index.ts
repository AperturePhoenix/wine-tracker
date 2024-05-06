import express, { json } from "express"
import authRoutes from "./routes/auth"

const app = express()
const port = 3000

// middlewares
app.use(json)

// routes
app.use("/auth", authRoutes)

app.listen(port, () => {
  console.log(`Wine Tracker Server listening on ${port}`)
})
