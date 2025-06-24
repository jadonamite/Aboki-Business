// src/components/auth/SignInForm.jsx
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Input } from "../ui";
import { ToastContainer } from "../ui/ToastContainer";
import AuthLayout from "./AuthLayout";
import { useForm } from "../../hooks/useForm";
import { validateSignIn } from "../../utils/validation";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { RiShakeHandsLine } from "react-icons/ri";
import { XMarkIcon } from "@heroicons/react/24/outline";

const DemoCredentialsModal = ({ isOpen, onClose, onSelectCredentials }) => {
   const modalRef = useRef(null);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
         }
      };

      if (isOpen) {
         document.addEventListener('mousedown', handleClickOutside);
         document.addEventListener('touchstart', handleClickOutside);
         document.body.style.overflow = 'hidden';
      }

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
         document.removeEventListener('touchstart', handleClickOutside);
         document.body.style.overflow = 'unset';
      };
   }, [isOpen, onClose]);

   if (!isOpen) return null;

   const credentials = [
      {
         title: "Admin Account",
         email: "admin@aboki.com",
         password: "password123",
         description: "Full access admin account",
         color: "from-purple-500 to-indigo-600"
      },
      {
         title: "Test User",
         email: "test@test.com", 
         password: "test123",
         description: "Basic user account for testing",
         color: "from-blue-500 to-cyan-600"
      }
   ];

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"></div>
         <div 
            ref={modalRef}
            className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 m-4 max-w-md w-full animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                     <RiShakeHandsLine className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Quick Sign In</h3>
               </div>
               <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
               </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">
               Choose a demo account to quickly access the platform
            </p>

            <div className="space-y-3">
               {credentials.map((cred, index) => (
                  <button
                     key={index}
                     onClick={() => {
                        onSelectCredentials(cred.email, cred.password);
                        onClose();
                     }}
                     className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
                     <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${cred.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                           <span className="text-white font-semibold text-lg">
                              {cred.title.charAt(0)}
                           </span>
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="font-medium text-gray-900 group-hover:text-purple-900 transition-colors">
                              {cred.title}
                           </h4>
                           <p className="text-sm text-gray-600 group-hover:text-purple-700 transition-colors">
                              {cred.description}
                           </p>
                           <p className="text-xs text-gray-500 mt-1 font-mono">
                              {cred.email}
                           </p>
                        </div>
                     </div>
                  </button>
               ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
               <p className="text-xs text-gray-500 text-center">
                  💡 These are demo accounts for testing purposes only
               </p>
            </div>
         </div>
      </div>
   );
};

const SignInForm = () => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [demoModalOpen, setDemoModalOpen] = useState(false);
   const [isShaking, setIsShaking] = useState(false);
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

   const handleDemoIconClick = () => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setDemoModalOpen(true);
   };

   return (
      <>
         <AuthLayout title="Sign in to your account">
            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Demo Credentials Trigger */}
               <div className="flex justify-center mb-6">
                  <button
                     type="button"
                     onClick={handleDemoIconClick}
                     className={`group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full hover:from-blue-100 hover:to-purple-100 transition-all duration-300 ${
                        isShaking ? 'animate-bounce' : ''
                     }`}
                     title="Quick sign in with demo accounts">
                     <RiShakeHandsLine className={`w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:scale-110 ${
                        isShaking ? 'animate-pulse' : ''
                     }`} />
                     <span className="text-sm font-medium text-blue-700 group-hover:text-blue-800">
                        Quick Sign In
                     </span>
                  </button>
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

         {/* Demo Credentials Modal */}
         <DemoCredentialsModal
            isOpen={demoModalOpen}
            onClose={() => setDemoModalOpen(false)}
            onSelectCredentials={fillDemoCredentials}
         />

         {/* Toast Container */}
         <ToastContainer toasts={toasts} onHideToast={hideToast} />
      </>
   );
};

export default SignInForm;