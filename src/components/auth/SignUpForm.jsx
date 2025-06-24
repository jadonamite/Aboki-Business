// src/components/auth/SignUpForm.jsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Input, Checkbox } from "../ui";
import { ToastContainer } from "../ui/ToastContainer";
import AuthLayout from "./AuthLayout";
import { useForm } from "../../hooks/useForm";
import { validateSignUp } from "../../utils/validation";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

const SignUpForm = () => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const { register } = useAuth();
   const { toasts, showSuccess, showError, showInfo, hideToast } = useToast();

   const { values, errors, handleChange, handleSubmit, setError, resetForm } =
      useForm({
         initialValues: {
            businessName: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
            agreeToTerms: false,
         },
         validationSchema: validateSignUp,
         onSubmit: async (data) => {
            setLoading(true);

            try {
               showInfo("Creating your account...", 3000);

               const result = await register(data);

               if (result.success) {
                  showSuccess(
                     `🎉 Welcome to Aboki, ${data.firstName}! Your account has been created successfully.`,
                     4000
                  );
                  resetForm();

                  setTimeout(() => {
                     showInfo("Redirecting you to sign in...", 2000);
                  }, 1500);

                  setTimeout(() => {
                     router.push("/auth/signin");
                  }, 3000);
               } else {
                  if (result.error.includes("already exists")) {
                     showError(
                        "❌ An account with this email already exists. Please try signing in instead."
                     );
                  } else if (result.error.includes("email")) {
                     showError("❌ Please provide a valid email address.");
                  } else if (result.error.includes("password")) {
                     showError("❌ Password does not meet the requirements.");
                  } else {
                     showError(`❌ Registration failed: ${result.error}`);
                  }

                  setError("email", result.error);
               }
            } catch (error) {
               console.error("Registration error:", error);
               showError(
                  "❌ An unexpected error occurred during registration. Please try again."
               );
               setError(
                  "email",
                  "An unexpected error occurred during registration"
               );
            } finally {
               setLoading(false);
            }
         },
      });

   const showPasswordInfo = () => {
      showInfo(
         `
   Password Requirements:
   • At least 8 characters long 
   • Contains uppercase letter
   • Contains lowercase letter  
   • Contains at least one number
 `,
         4000
      );
   };

   return (
      <>
         <AuthLayout
            title="Create Account"
            subtitle="Empower your crypto business">
            <form onSubmit={handleSubmit} className="space-y-6">
               <Input
                  label="Business name"
                  name="businessName"
                  placeholder="Enter your business name"
                  value={values.businessName}
                  onChange={handleChange}
                  error={errors.businessName}
                  required
               />

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                     label="First name"
                     name="firstName"
                     placeholder="First name"
                     value={values.firstName}
                     onChange={handleChange}
                     error={errors.firstName}
                     required
                  />

                  <Input
                     label="Last name"
                     name="lastName"
                     placeholder="Last name"
                     value={values.lastName}
                     onChange={handleChange}
                     error={errors.lastName}
                     required
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                     Phone number
                  </label>
                  <div className="flex">
                     <select className="px-3 py-3 border border-gray-300 rounded-l-lg bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors">
                        <option>+234</option>
                        <option>+1</option>
                        <option>+44</option>
                        <option>+91</option>
                        <option>+86</option>
                     </select>
                     <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone number"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        className="flex-1 px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                     />
                  </div>
                  {errors.phoneNumber && (
                     <p className="mt-2 text-sm text-red-600">
                        {errors.phoneNumber}
                     </p>
                  )}
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
                        Password *
                     </label>
                     <button
                        type="button"
                        onClick={showPasswordInfo}
                        className="text-sm text-purple-600 hover:text-purple-700 transition-colors">
                        ℹ️ Requirements
                     </button>
                  </div>
                  <Input
                     name="password"
                     type="password"
                     placeholder="Create a strong password"
                     value={values.password}
                     onChange={handleChange}
                     error={errors.password}
                     required
                  />
               </div>

               <Checkbox
                  label={
                     <span>
                        I certify that I am 18 years of age or older, I agree to
                        the{" "}
                        <button
                           type="button"
                           onClick={() =>
                              showInfo(
                                 "Terms of Use: This is a demo application. In production, this would link to your actual terms."
                              )
                           }
                           className="text-purple-600 hover:text-purple-700 underline transition-colors">
                           Terms of Use
                        </button>
                        , and I have read the{" "}
                        <button
                           type="button"
                           onClick={() =>
                              showInfo(
                                 "Privacy Policy: Aboki does not collect or store any real user data."
                              )
                           }
                           className="text-purple-600 hover:text-purple-700 underline transition-colors">
                           Privacy Policy
                        </button>
                        .
                     </span>
                  }
                  checked={values.agreeToTerms}
                  onChange={handleChange}
                  name="agreeToTerms"
                  error={errors.agreeToTerms}
                  required
               />

               <Button
                  type="submit"
                  className="w-full"
                  loading={loading}
                  disabled={!values.agreeToTerms || loading}>
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
                        Creating account...
                     </div>
                  ) : (
                     "Sign up"
                  )}
               </Button>

               <div className="text-center">
                  <span className="text-gray-600">
                     Already have an account?{" "}
                  </span>
                  <button
                     type="button"
                     onClick={() => router.push("/auth/signin")}
                     className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                     Sign in
                  </button>
               </div>
            </form>
         </AuthLayout>

         {/* Toast Container */}
         <ToastContainer toasts={toasts} onHideToast={hideToast} />
      </>
   );
};

export default SignUpForm;
