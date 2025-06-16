import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Input } from "../ui";
import AuthLayout from "./AuthLayout";
import { useForm } from "../../hooks/useForm";
import { validateSignIn } from "../../utils/validation";
import { useAuth } from "../../hooks/useAuth";

const SignInForm = () => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const { login } = useAuth();

   const { values, errors, handleChange, handleSubmit, setError } = useForm({
      initialValues: {
         email: "",
         password: "",
      },
      validationSchema: validateSignIn,
      onSubmit: async (data) => {
         setLoading(true);
         try {
            console.log("Attempting login with:", data);

            const result = await login(data.email, data.password);

            if (result.success) {
               console.log("Login successful:", result);
               // Redirect to dashboard
               router.push("/dashboard");
            } else {
               console.log("Login failed:", result.error);
               setError("email", result.error);
            }
         } catch (error) {
            console.error("Login error:", error);
            setError("email", "An unexpected error occurred");
         } finally {
            setLoading(false);
         }
      },
   });

   return (
      <AuthLayout title="Sign in to your account">
         <form onSubmit={handleSubmit} className="space-y-6">
            {/* Demo Credentials Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
               <h4 className="font-medium text-blue-900 mb-2">
                  Demo Credentials
               </h4>
               <div className="text-sm text-blue-700 space-y-1">
                  <p>
                     <strong>Email:</strong> admin@aboki.com
                  </p>
                  <p>
                     <strong>Password:</strong> password123
                  </p>
                  <p className="text-xs mt-2">
                     Or try: test@test.com / test123
                  </p>
               </div>
            </div>

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
               {loading ? "Signing in..." : "Sign in"}
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
