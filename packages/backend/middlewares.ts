import type { NextFunction, Request, Response } from "express"
import { JwtPayload, verify } from "jsonwebtoken"

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers.authorization) {
    res.status(401).json("Must be logged in")
    return
  }
  if (!req.headers.authorization.startsWith("Bearer ")) {
    res.status(401).json("Missing Bearer")
  }

  try {
    const jwtPayload = verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET) as JwtPayload
    if (!req.session) req.session = {} as any
    req.session.userId = jwtPayload.sub as any
    next()
  } catch (error) {
    res.status(401).json("Invalid access token provided")
  }
}
