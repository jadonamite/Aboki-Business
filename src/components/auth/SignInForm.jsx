import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Input } from "../ui";
import AuthLayout from "./AuthLayout";
import { useForm } from "../../hooks/useForm";
import { validateSignIn } from "../../utils/validation";

const SignInForm = () => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);

   const { values, errors, handleChange, handleSubmit, setError } = useForm({
      initialValues: {
         email: "",
         password: "",
      },
      validationSchema: validateSignIn,
      onSubmit: async (data) => {
         setLoading(true);
         try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Here you would typically make your API call
            console.log("Sign in data:", data);

            // Redirect to dashboard
            router.push("/dashboard");
         } catch (error) {
            setError("email", "Invalid email or password");
         } finally {
            setLoading(false);
         }
      },
   });

   return (
      <AuthLayout title="Sign in to your account">
         <form onSubmit={handleSubmit} className="space-y-6">
            <Input
               label="Email address"
               name="email"
               type="email"
               placeholder="Email address"
               value={values.email}
               onChange={handleChange}
               error={errors.email}
               required
            />

            <div>
               <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                     Password
                  </label>
                  <button
                     type="button"
                     onClick={() => router.push("/auth/forgot-password")}
                     className="text-sm text-purple-600 hover:text-purple-700">
                     Forgot password?
                  </button>
               </div>
               <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
               />
            </div>

            <Button type="submit" className="w-full" loading={loading}>
               Sign in
            </Button>

            <div className="text-center">
               <span className="text-gray-600">Don't have an account? </span>
               <button
                  type="button"
                  onClick={() => router.push("/auth/signup")}
                  className="text-purple-600 hover:text-purple-700 font-medium">
                  Sign up
               </button>
            </div>
         </form>
      </AuthLayout>
   );
};

export default SignInForm;
