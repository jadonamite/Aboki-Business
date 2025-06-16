import React, { useState, forwardRef } from "react";

const Input = forwardRef(
   (
      {
         label,
         error,
         type = "text",
         placeholder,
         required = false,
         className = "",
         ...props
      },
      ref
   ) => {
      const [showPassword, setShowPassword] = useState(false);
      const isPassword = type === "password";
      const inputType = isPassword && showPassword ? "text" : type;

      return (
         <div className="space-y-2">
            {label && (
               <label className="block text-sm font-medium text-gray-700">
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
               </label>
            )}
            <div className="relative">
               <input
                  ref={ref}
                  type={inputType}
                  placeholder={placeholder}
                  className={`
            w-full px-4 py-3 rounded-lg border transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
            ${
               error
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
            }
            ${className}
          `}
                  {...props}
               />
               {isPassword && (
                  <button
                     type="button"
                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
                     onClick={() => setShowPassword(!showPassword)}>
                     {showPassword ? (
                        <svg
                           className="h-5 w-5 text-gray-400 hover:text-gray-600"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L7.5 7.5m2.378 2.378a3 3 0 004.243-4.243M7.5 7.5l2.878 2.878m0 0L13.5 13.5M4.505 4.505L19.5 19.5"
                           />
                        </svg>
                     ) : (
                        <svg
                           className="h-5 w-5 text-gray-400 hover:text-gray-600"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                           />
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                           />
                        </svg>
                     )}
                  </button>
               )}
            </div>
            {error && (
               <p className="text-sm text-red-600 flex items-center">
                  <svg
                     className="h-4 w-4 mr-1 flex-shrink-0"
                     fill="currentColor"
                     viewBox="0 0 20 20">
                     <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                     />
                  </svg>
                  {error}
               </p>
            )}
         </div>
      );
   }
);
export default Input;
Input.displayName = "Input";
