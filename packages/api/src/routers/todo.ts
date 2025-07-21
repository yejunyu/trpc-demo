import { z } from "zod";
import { protectedProcedure, router } from "@/trpc.js";
import { TRPCError } from "@trpc/server";

export const todoRouter = router({
  getTodos: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.db.todo.findMany({
      where: {
        ownerId: ctx.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return todos;
  }),
  addTodo: protectedProcedure
    .input(
      z.object({
        text: z.string().min(1, { error: "todo text cannot be empty!" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newTodo = await ctx.db.todo.create({
        data: {
          text: input.text,
          ownerId: ctx.user.id,
        },
      });
      return newTodo;
    }),
  toggleTodo: protectedProcedure
    .input(
      z.object({
        id: z.int(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existTodo = await ctx.db.todo.findFirst({
        where: {
          id: input.id,
          ownerId: ctx.user.id,
        },
      });
      if (!existTodo) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "todo not found",
        });
      }
      // 更新
      const updateTodo = await ctx.db.todo.update({
        where: {
          id: input.id,
        },
        data: {
          completed: !existTodo.completed,
        },
      });
      return updateTodo;
    }),
  deleteTodo: protectedProcedure
    .input(
      z.object({
        id: z.int(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existTodo = ctx.db.todo.findFirst({
        where: {
          id: input.id,
        },
      });
      if (!existTodo) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "todo not found",
        });
      }
      await ctx.db.todo.delete({
        where: {
          id: input.id,
        },
      });
      return { success: true };
    }),
});
