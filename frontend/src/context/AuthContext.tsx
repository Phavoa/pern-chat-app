import { createContext, Dispatch, useState, ReactNode, useEffect, SetStateAction, useContext } from "react";
import toast from "react-hot-toast";

type AuthUserType = {
    id: string;
    username: string;
    email: string;
    profilePic: string;
    gender: string;
};

const AuthContext = createContext<{
    authUser: AuthUserType | null;
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
    isLoading: boolean;
}>({
    authUser: null,
    setAuthUser: () => { },
    isLoading: true,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if(!res.ok) throw new Error(data.message);
                setAuthUser(data);
            } catch (error: any) {
                console.error(error)
                toast.error(error.message);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchAuthUser();
    }, [setAuthUser, setIsLoading]);

    return (
        <AuthContext.Provider
            value={{
                authUser,
                setAuthUser,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
