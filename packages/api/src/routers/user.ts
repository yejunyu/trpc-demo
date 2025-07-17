import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure, router } from "@/trpc.js";

export const userRouter = router({
  register: publicProcedure
    .input(
      z.object({
        username: z.string().min(3).max(10),
        password: z.string().min(6).max(20),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { username, password } = input;
      const existUser = await ctx.db.user.findUnique({
        where: { username },
      });
      if (existUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "user already exists",
        });
      }
      const hashedPasswd = await bcrypt.hash(password, 10);
      const newUser = await ctx.db.user.create({
        data: { username, password: hashedPasswd },
      });
      return {
        status: "success",
        user: { id: newUser.id, username: newUser.username },
      };
    }),
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { username, password } = input;
      // 查找用户
      const user = await ctx.db.user.findUnique({
        where: { username },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invalid username or password",
        });
      }
      // 比较密码
      const isPasswdValid = await bcrypt.compare(password, user.password);
      if (!isPasswdValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }
      // 发token
      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );
      return { token };
    }),
  me: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    const user = await ctx.db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        createdAt: true,
        todos: true,
      },
    });
    return user;
  }),
});
