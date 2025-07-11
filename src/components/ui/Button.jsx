import React from "react";

const Button = ({
   children,
   variant = "primary",
   size = "md",
   loading = false,
   disabled = false,
   className = "",
   ...props
}) => {
   const baseClasses =
      "font-medium rounded-lg transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";

   const variants = {
      primary:
         "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-purple-500",
      secondary:
         "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
      ghost: "text-purple-600 hover:text-purple-700 hover:bg-purple-50 focus:ring-purple-500",
   };

   const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
   };

   return (
      <button
         className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
         } ${className}`}
         disabled={disabled || loading}
         {...props}>
         {loading ? (
            <div className="flex items-center justify-center">
               <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
               Loading...
            </div>
         ) : (
            children
         )}
      </button>
   );
};

export default Button;
