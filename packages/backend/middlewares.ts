import type { NextFunction, Request, Response } from "express"
import { type JwtPayload, verify } from "jsonwebtoken"

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers.authorization) {
    res.status(401).json("Must be logged in")
    return
  }
  if (!req.headers.authorization.startsWith("Bearer ")) {
    res.status(401).json("Missing Bearer")
  }

  try {
    const jwtPayload = verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET) as JwtPayload
    if (!req.session) req.session = { userId: jwtPayload.sub as unknown as number }
    else req.session.userId = jwtPayload.sub as unknown as number
    next()
  } catch (error) {
    res.status(401).json("Invalid access token provided")
  }
}
