// entry logging -> rate limiter -> cors -> json parser -> routes -> error handler

import express from "express"
import cors from "cors"
import { globalErrorHandler } from "./errors/globalErrorHandler.js"
import notesRouter from "./api/routes/notesRoute.js"
import usersRouter from "./api/routes/usersRoute.js"
import authRouter from "./api/routes/authRoute.js"
import config from "./config/index.js"
import { log } from "./utils/logger.js"
import { v4 as uuidv4 } from "uuid"
import { generalLimiter } from "./api/middlewares/rateLimiter.js"

const app = express()

// trust proxy for cloud deployments
app.set("trust proxy", 1)

// log every incoming request
app.use((req, res, next) => {
  req.id = uuidv4()

  log({
    level: "info",
    event: "request_received",
    data: {
      requestId: req.id,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip
    }
  })

  next()
})

// limit number of requests
app.use(generalLimiter)

// allow cross origin requests
app.use(cors({ origin: config.allowedOrigin }))

// parse json request body
app.use(express.json())

// health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// app routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", usersRouter)
app.use("/api/v1/notes", notesRouter)

// handle all errors
app.use(globalErrorHandler)

export default app
