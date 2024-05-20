export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string
    }
  }

  namespace Express {
    interface Request {
      session: {
        userId: number
      }
    }
  }
}
