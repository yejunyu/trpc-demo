import { router } from "./trpc.js";
import { userRouter } from "./routers/user.js";
import { todoRouter } from "./routers/todo.js";

export const appRouter = router({
  user: userRouter,
  todo: todoRouter,
});
export type AppRouter = typeof appRouter;
