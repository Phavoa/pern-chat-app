import React, { useState } from "react";
import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
import useSignup from "../hooks/useSignup";
import AuthLayout from "@/components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUp: React.FC = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { isLoading, signup } = useSignup();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (gender: "male" | "female") => {
    setInputs((prev) => ({ ...prev, gender }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(inputs);
  };

  return (
    <AuthLayout>
      <section className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <div className="w-full p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl mb-6 font-semibold text-center text-blue-500">
            Welcome back!
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="text-sm text-gray-200">
                Full Name
              </label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={inputs.fullName}
                onChange={handleInputChange}
                className="mt-1 text-gray-100 border-gray-600"
                required
              />
            </div>

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="text-sm text-gray-200">
                Username
              </label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="johndoe"
                value={inputs.username}
                onChange={handleInputChange}
                className="mt-1 text-gray-100 border-gray-600"
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
                placeholder="Enter Password"
                value={inputs.password}
                onChange={handleInputChange}
                className="mt-1 text-gray-100 border-gray-600"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="text-sm text-gray-200">
                Confirm Password
              </label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={inputs.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 text-gray-100 border-gray-600"
                required
              />
            </div>

            {/* Gender Checkbox */}
            <GenderCheckbox
              selectedGender={inputs.gender}
              onCheckboxChange={handleCheckboxChange}
            />

            {/* Already Have an Account Link */}
            <div className="flex justify-end">
              <Link
                to="/login"
                className="text-sm text-gray-300 hover:underline hover:text-blue-500"
              >
                Already have an account?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </div>
      </section>
    </AuthLayout>
  );
};

export default SignUp;
