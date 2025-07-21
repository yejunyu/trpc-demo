import { type FormEvent, useState } from "react";
import { trpc } from "@/trpc.ts";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // 登录/注册模式切换
  const [isRegistering, setIsRegistering] = useState(false);
  // 显示错误信息
  const [error, setError] = useState<string | null>(null);

  // 获取trpc
  const utils = trpc.useUtils();

  // 注册的mutation
  const registerMutation = trpc.user.register.useMutation({
    onSuccess: () => {
      alert("注册成功");
      setIsRegistering(false);
      setError(null);
      setUsername("");
      setPassword("");
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });
  const loginMutation = trpc.user.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      // 关键！让 `user.me` 查询失效，
      // AuthGate 组件会因为这个查询失效而自动重新获取数据，
      // 从而发现用户已登录，并切换到 TodoList 页面。
      console.log("22222");
      utils.user.me.invalidate();
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
  // 处理表单提交
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (isRegistering) {
      registerMutation.mutate({ username, password });
    } else {
      loginMutation.mutate({ username, password });
    }
  };
  return (
    <div>
      <h1>{isRegistering ? "Register" : "Login"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* 显示错误信息 */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          disabled={registerMutation.isLoading || loginMutation.isLoading}
        >
          {isRegistering
            ? registerMutation.isLoading
              ? "Registering..."
              : "Register"
            : loginMutation.isLoading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>
      <button
        onClick={() => {
          setIsRegistering(!isRegistering);
          setError(null);
        }}
        disabled={registerMutation.isLoading || loginMutation.isLoading}
      >
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default AuthPage;
