import {trpc} from "@/trpc";
import AuthPage from "./AuthPage";
import TodoList from "./TodoList";

const AuthGate = () => {
  console.log("1111");
  
    const {data: user, isLoading, isError} = trpc.user.me.useQuery()
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError || !user) {
        return <AuthPage></AuthPage>
    }
    return <TodoList/>;
};

export default AuthGate;
