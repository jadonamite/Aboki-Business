import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Input, Checkbox } from "../ui";
import AuthLayout from "./AuthLayout";
import { useForm } from "../../hooks/useForm";
import { validateSignUp } from "../../utils/validation";

const SignUpForm = () => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);

   const { values, errors, handleChange, handleSubmit, setError } = useForm({
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
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Here you would typically make your API call
            console.log("Sign up data:", data);

            // Redirect to sign in or dashboard
            router.push("/auth/signin");
         } catch (error) {
            setError("email", "An error occurred during sign up");
         } finally {
            setLoading(false);
         }
      },
   });

   return (
      <AuthLayout
         title="Create Account"
         subtitle="Empower your crypto business">
         <form onSubmit={handleSubmit} className="space-y-6">
            <Input
               label="Business name"
               name="businessName"
               placeholder="Business name"
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
                  <select className="px-3 py-3 border border-gray-300 rounded-l-lg bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                     <option>+234</option>
                     <option>+1</option>
                     <option>+44</option>
                  </select>
                  <input
                     type="tel"
                     name="phoneNumber"
                     placeholder="Phone number"
                     value={values.phoneNumber}
                     onChange={handleChange}
                     className="flex-1 px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
               placeholder="Email address"
               value={values.email}
               onChange={handleChange}
               error={errors.email}
               required
            />

            <Input
               label="Password"
               name="password"
               type="password"
               placeholder="Password"
               value={values.password}
               onChange={handleChange}
               error={errors.password}
               required
            />

            <Checkbox
               label={
                  <span>
                     I certify that I am 18 years of age or older, I agree to
                     the{" "}
                     <a
                        href="/terms"
                        className="text-purple-600 hover:text-purple-700 underline">
                        Terms of Use
                     </a>
                     , and I have read the{" "}
                     <a
                        href="/privacy"
                        className="text-purple-600 hover:text-purple-700 underline">
                        Privacy Policy
                     </a>
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
               disabled={!values.agreeToTerms}>
               Sign up
            </Button>

            <div className="text-center">
               <span className="text-gray-600">Already have an account? </span>
               <button
                  type="button"
                  onClick={() => router.push("/auth/signin")}
                  className="text-purple-600 hover:text-purple-700 font-medium">
                  Sign in
               </button>
            </div>
         </form>
      </AuthLayout>
   );
};

export default SignUpForm;
