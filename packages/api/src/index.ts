import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./router.js";
import { createContext } from "./trpc.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(
  "/api",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
// 启动fuwuq
const port = 4000;
app.listen(port,()=>{
    console.log("xxxxxxxxx,启动。。。。。。");
    
})
