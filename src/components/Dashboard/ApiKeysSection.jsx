import { useState } from "react";
import {
   EyeIcon,
   EyeSlashIcon,
   DocumentDuplicateIcon,
   CheckIcon,
} from "@heroicons/react/24/outline";

const CopyableField = ({ label, value, isSecret = false }) => {
   const [copied, setCopied] = useState(false);
   const [revealed, setRevealed] = useState(!isSecret);

   const handleCopy = async () => {
      if (isSecret && !revealed) return;
      try {
         await navigator.clipboard.writeText(value);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch (err) {
         console.error("Failed to copy text: ", err);
      }
   };

   const displayValue =
      isSecret && !revealed ? "••••••••••••••••••••••••••••••••" : value;

   return (
      <div className="flex-1 min-w-0">
         <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
         </label>
         <div className="relative flex items-center">
            <input
               type="text"
               value={displayValue}
               readOnly
               className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
            <div className="absolute right-3 flex items-center space-x-2">
               {isSecret && (
                  <button
                     onClick={() => setRevealed(!revealed)}
                     className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                     title={revealed ? "Hide" : "Show"}>
                     {revealed ? (
                        <EyeSlashIcon className="w-4 h-4" />
                     ) : (
                        <EyeIcon className="w-4 h-4" />
                     )}
                  </button>
               )}
               <button
                  onClick={handleCopy}
                  className="p-1.5 text-gray-400 hover:text-purple-600 transition-colors"
                  title="Copy to clipboard">
                  {copied ? (
                     <CheckIcon className="w-4 h-4 text-emerald-500" />
                  ) : (
                     <DocumentDuplicateIcon className="w-4 h-4" />
                  )}
               </button>
            </div>
         </div>
      </div>
   );
};

const ApiKeysSection = ({ apiKeys }) => {
   return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
               API Configuration
            </h2>
            <div className="flex items-center space-x-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
               <span className="text-sm text-gray-600">Active</span>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CopyableField
               label="Client ID"
               value={
                  apiKeys?.clientId || "uin2 23u23n 2iu3ni 2i23n n23ni i2n3"
               }
            />
            <CopyableField
               label="Client Secret"
               value={
                  apiKeys?.clientSecret || "uin2 23u23n 2iu3ni 2i23n n23ni i2n3"
               }
               isSecret={true}
            />
         </div>

         <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
               <div className="flex-shrink-0">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                     <span className="text-white text-xs font-bold">!</span>
                  </div>
               </div>
               <div>
                  <h4 className="text-sm font-medium text-blue-900 mb-1">
                     API Security
                  </h4>
                  <p className="text-sm text-blue-700">
                     Keep your API credentials secure. Never expose them in
                     client-side code or public repositories.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ApiKeysSection;
