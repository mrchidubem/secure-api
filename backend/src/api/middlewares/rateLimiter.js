// Redis-backed rate limiters with different behaviors

import rateLimit from "express-rate-limit"
import RedisStore from "rate-limit-redis"
import Redis from "ioredis";
import config from "../../config/index.js"

const redisClient = new Redis(config.redisUrl);

// Shared 429 handler
const rateLimitHandler = (req, res) => {
    res.status(429).json({
        status: "error",
        message: "Too many requests. Please try again later"
    })
}

// General API limiter (lenient)
const generalLimiter = rateLimit({
    store: new RedisStore({
        prefix: "rl:general:",
        sendCommand: (...args) => redisClient.call(...args)
    }),
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler
})

// Auth limiter (strict: brute-force protection)
const authLimiter = rateLimit({
    store: new RedisStore({
        prefix: "rl:auth:",
        sendCommand: (...args) => redisClient.call(...args)
    }),
    windowMs: 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler
})

export { authLimiter, generalLimiter }
