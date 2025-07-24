import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/trpc.ts";
import { httpBatchLink } from "@trpc/client";
import AuthGate from "@/components/AuthGate.tsx";

function App() {
  // 创建一个React Query客户端实例,使用useSate来使生命周期内只创建一次
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/api",
          // 写成函数形式可以在每次请求前都执行
          headers() {
            const token = localStorage.getItem("token");
            return {
              // 如果token存在则放入header
              authorization: token ? `Bearer ${token}` : "",
            };
          },
        }),
      ],
    });
  });
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthGate />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
