import { initTRPC, TRPCError } from "@trpc/server";
import { db } from "./db/db.js";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import superjson from "superjson";

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
// const t = initTRPC.context<Context>().create({
  // transformer: superjson,
// });
const t = initTRPC.context<Context>().create();

// 全局中间件：日志，计时，异常处理
const globalMiddleware = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();
  try {
    const result = await next();
    const end = Date.now();
    console.log(`[${type}] ${path} - ${end - start}ms`);
    if (result.ok) {
      return {
        ...result,
        data: {
          code: 0,
          message: "success",
          data: result.data,
        },
      };
    } else {
      return {
        ...result,
        data: {
          code: 1,
          message: result.error?.message || "error",
          data: null,
        },
      };
    }
  } catch (error) {
    const duration = Date.now() - start;
    if (error instanceof TRPCError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(
        `[${type}] ${path} - ${errorCode} - ${errorMessage} - ${duration}ms`
      );
      throw error;
    } else if (error instanceof ZodError) {
      console.error(
        `[${type}] ${path} - ZodError - ${error.message} - ${duration}ms`
      );
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: error.message,
      });
    } else {
      console.error(
        `[${type}] ${path} - Internal Server Error - ${error} - ${duration}ms`
      );
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
      });
    }
  }
});

const tWithMiddleware = t.procedure.use(globalMiddleware);
// 导出组件
export const router = t.router;
export const publicProcedure = tWithMiddleware;

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
export const protectedProcedure = tWithMiddleware.use(isAuthed);
