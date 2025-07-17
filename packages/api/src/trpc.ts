import { initTRPC, TRPCError } from "@trpc/server";
import { db } from "./db/db.js";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import superjson from "superjson";
import pino from "pino";

const logger = pino();

export const createContext = ({ req }: CreateExpressContextOptions) => {
  // 读取token
  const token = req.headers.authorization?.split(" ")[1];
  // 从token解析出user
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: bigint;
      };
      return { db, user: { id: decoded.userId } };
    } catch (error) {
      console.error("invalid token", error);
    }
  }
  return { db, user: null };
};

// 初始化 trpc
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

// 全局中间件：日志，计时，异常处理
const globalMiddleware = t.middleware(async (opts) => {
  const { path, type, next } = opts;
  const start = Date.now();

  try {
    const result = await next();
    const durationMs = Date.now() - start;
    logger.info({ path, type, durationMs }, '✅ OK');

    // 成功时，直接在这里包装，使用正确的路径
    return {
      ...result,
      data: {
        type: 'data',
        data: {
          code: 200,
          msg: 'success',
          data: result.data.data, // 正确的业务数据路径
        },
      },
    };
  } catch (error) {
    // ... (catch 块的代码和之前一样，是正确的)
  }
});

const baseProcedure = t.procedure.use(globalMiddleware);

// 导出组件
export const router = t.router;
export const publicProcedure = baseProcedure;

// 创建中间件来检查用户是否认证
const isAuthed = t.middleware(({ ctx, next }) => {
  console.log(ctx.user);

  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});
// 创建一个受保护的Procedure
export const protectedProcedure = t.procedure.use(isAuthed);
