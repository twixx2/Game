import { useAuth } from "@context";
export const useHelperHome = () => {
    const { isAuth } = useAuth();
    return { isAuth }
};