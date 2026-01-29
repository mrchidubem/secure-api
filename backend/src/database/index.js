/**
 * MongoDB connection module
 * - Connects to MongoDB using Mongoose
 * - Applies production-ready connection options
 * - Logs successful connection using centralized logger
 * - Throws on failure (handled by server-level error handlers)
 */

import mongoose from "mongoose";
import config from "../config/index.js";
import { log } from "../utils/logger.js";

const options = {
  retryWrites: true,                    
  w: "majority",                        
  readConcern: { level: "majority" },   
  serverSelectionTimeoutMS: 5000,        
  connectTimeoutMS: 10000,              
  socketTimeoutMS: 45000,                
  maxPoolSize: 50,                       
  minPoolSize: 5,                        
  compressors: ["zlib"],                
  zlibCompressionLevel: 6,               
  appName: "MyAwesomeApp-Prod",          
};

const connectDB = async () => {
  const conn = await mongoose.connect(config.mongoUri, options);

  log({
    level: "info",
    event: "DB_CONNECTED",
    message: "MongoDB connected successfully",
   
  });

  return conn;
};


export default connectDB;
