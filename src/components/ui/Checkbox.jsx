import React from "react";

const Checkbox = ({
   label,
   checked,
   onChange,
   error,
   required = false,
   className = "",
   ...props
}) => {
   return (
      <div className="space-y-2">
         <div className="flex items-start">
            <div className="flex items-center h-5">
               <input
                  type="checkbox"
                  checked={checked}
                  onChange={onChange}
                  className={`
              h-4 w-4 rounded border-gray-300 text-purple-500 
              focus:ring-purple-500 focus:ring-2 transition-colors
              ${error ? "border-red-300" : ""}
              ${className}
            `}
                  {...props}
               />
            </div>
            <div className="ml-3 text-sm">
               <label className="text-gray-700">
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
               </label>
            </div>
         </div>
         {error && (
            <p className="text-sm text-red-600 ml-7 flex items-center">
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
};
export default Checkbox;
