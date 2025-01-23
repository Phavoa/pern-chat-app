import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import AuthLayout from "../components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login: React.FC = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const { login, isLoading } = useLogin();

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    login(inputs);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AuthLayout>
      <section className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <div className="w-full p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl mb-6 font-semibold text-center text-blue-500">
            Welcome Back!
          </h1>
          <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="text-sm text-gray-200">
                Username
              </label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={inputs.username}
                onChange={handleInputChange}
                className="mt-1 text-gray-100 border-gray-600 "
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="text-sm text-gray-200">
                Password
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={inputs.password}
                onChange={handleInputChange}
                className="mt-1 text-gray-100 border-gray-600 "
                required
              />
            </div>

            {/* Sign Up Link */}
            <div className="flex justify-end">
              <Link
                to="/signup"
                className="text-sm text-gray-300 hover:underline hover:text-blue-500"
              >
                Don't have an account?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </section>
    </AuthLayout>
  );
};

export default Login;
