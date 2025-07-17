// 用于全局共享 PrismaClient 实例
import { PrismaClient } from "@/generated/prisma/index.js";

export const db = new PrismaClient();