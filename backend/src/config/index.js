import dotenv from "dotenv";
dotenv.config();

const config = {
  mongoUri: process.env.MONGODB_URI,
  port: process.env.PORT || 5000,
  allowedOrigin: process.env.ALLOWED_ORIGIN,
  jwtSecret: process.env.JWT_SECRET,
  redisUrl : process.env.REDIS_URL
};

export default config;
