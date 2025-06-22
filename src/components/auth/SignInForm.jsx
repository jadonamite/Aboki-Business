// src/components/auth/SignInForm.jsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Input } from "../ui";
import { ToastContainer } from "../ui/ToastContainer";
import AuthLayout from "./AuthLayout";
import { useForm } from "../../hooks/useForm";
import { validateSignIn } from "../../utils/validation";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

const SignInForm = () => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const { login } = useAuth();
   const { toasts, showSuccess, showError, showInfo, hideToast } = useToast();

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
            showInfo("Signing you in...");

            const result = await login(data.email, data.password);

            if (result.success) {
               console.log("Login successful:", result);
               showSuccess(`Welcome back, ${result.user.firstName}! 🎉`);

               setTimeout(() => {
                  router.push("/dashboard");
               }, 1000);
            } else {
               if (result.error.includes("No account found")) {
                  showError("❌ No account found with this email address.");
               } else if (result.error.includes("Incorrect password")) {
                  showError("❌ Incorrect password. Please try again.");
               } else {
                  showError(`❌ Login failed: ${result.error}`);
               }

               setError("email", result.error);
            }
         } catch (error) {
            console.error("Login error:", error);
            showError("❌ An unexpected error occurred. Please try again.");
            setError("email", "An unexpected error occurred");
         } finally {
            setLoading(false);
         }
      },
   });

   // Helper function to fill demo credentials
   const fillDemoCredentials = (email, password) => {
      const emailEvent = {
         target: { name: "email", value: email, type: "email" },
      };
      const passwordEvent = {
         target: { name: "password", value: password, type: "password" },
      };

      handleChange(emailEvent);
      handleChange(passwordEvent);
      showInfo('Demo credentials filled! Click "Sign in" to continue.');
   };

   return (
      <>
         <AuthLayout title="Sign in to your account">
            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Demo Credentials Info */}
               <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-blue-900 mb-3">
                     🚀 Demo Credentials
                  </h4>
                  <div className="space-y-2">
                     <button
                        type="button"
                        onClick={() =>
                           fillDemoCredentials("admin@aboki.com", "password123")
                        }
                        className="w-full text-left bg-white hover:bg-blue-50 border border-blue-200 rounded-md p-2 text-sm transition-colors">
                        <div className="font-medium text-blue-900">
                           Admin Account
                        </div>
                        <div className="text-blue-600">
                           admin@aboki.com / password123
                        </div>
                     </button>

                     <button
                        type="button"
                        onClick={() =>
                           fillDemoCredentials("test@test.com", "test123")
                        }
                        className="w-full text-left bg-white hover:bg-blue-50 border border-blue-200 rounded-md p-2 text-sm transition-colors">
                        <div className="font-medium text-blue-900">
                           Test Account
                        </div>
                        <div className="text-blue-600">
                           test@test.com / test123
                        </div>
                     </button>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">
                     💡 Click on any credential set to auto-fill the form
                  </p>
               </div>

               <Input
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
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
                        onClick={() =>
                           showInfo("Password reset feature coming soon! 🔧")
                        }
                        className="text-sm text-purple-600 hover:text-purple-700 transition-colors">
                        Forgot password?
                     </button>
                  </div>
                  <Input
                     name="password"
                     type="password"
                     placeholder="Enter your password"
                     value={values.password}
                     onChange={handleChange}
                     error={errors.password}
                     required
                  />
               </div>

               <Button
                  type="submit"
                  className="w-full"
                  loading={loading}
                  disabled={loading}>
                  {loading ? (
                     <div className="flex items-center justify-center">
                        <svg
                           className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24">
                           <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"></circle>
                           <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                     </div>
                  ) : (
                     "Sign in"
                  )}
               </Button>

               <div className="text-center">
                  <span className="text-gray-600">Don't have an account? </span>
                  <button
                     type="button"
                     onClick={() => router.push("/auth/signup")}
                     className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                     Sign up
                  </button>
               </div>
            </form>
         </AuthLayout>

         {/* Toast Container */}
         <ToastContainer toasts={toasts} onHideToast={hideToast} />
      </>
   );
};

export default SignInForm;
