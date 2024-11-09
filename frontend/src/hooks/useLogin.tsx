import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

type LoginInputs = {
  username: string;
  password: string;
};

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (inputs: LoginInputs) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        body: JSON.stringify(inputs),
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAuthUser(data);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};

export default useLogin;
