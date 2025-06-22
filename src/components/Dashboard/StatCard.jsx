// components/Dashboard/StatCard.jsx
import React from "react";
// import {
//    TrendingUpIcon,
//    TrendingDownIcon,
//    UsersIcon,
//    CubeIcon,
//    ChartBarIcon,
//    CurrencyDollarIcon,
// } from "@heroicons/react/24/outline";
// // Fallback icons if Heroicons aren't available
const TrendingUpIcon = ({ className }) => (
   <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
   </svg>
);

const TrendingDownIcon = ({ className }) => (
   <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
      />
   </svg>
);

const UsersIcon = ({ className }) => (
   <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
      />
   </svg>
);

const CubeIcon = ({ className }) => (
   <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={8}
         d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
   </svg>
);

const ChartBarIcon = ({ className }) => (
   <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
   </svg>
);

const CurrencyDollarIcon = ({ className }) => (
   <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
      />
   </svg>
);

const StatCard = ({ metric, className = "", style = {} }) => {
   const iconMap = {
      users: UsersIcon,
      orders: CubeIcon,
      volume: ChartBarIcon,
      earnings: CurrencyDollarIcon,
   };

   const Icon = iconMap[metric.iconType] || UsersIcon;
   const isPositive = metric.trend === "up";

   // Color schemes for different metrics
   const colorSchemes = {
      users: "from-blue-500 to-purple-600",
      orders: "from-purple-500 to-pink-600",
      volume: "from-green-500 to-teal-600",
      earnings: "from-yellow-500 to-orange-600",
   };

   const bgGradient =
      colorSchemes[metric.iconType] || "from-blue-500 to-purple-600";

   return (
      <div
         className={`group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-[1.02] ${className}`}
         style={style}>
         {/* Background Gradient Effect */}
         <div
            className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${bgGradient} opacity-5 rounded-full blur-2xl`}></div>

         <div className="relative flex items-start justify-between">
            <div className="flex-1">
               <p className="text-sm font-medium text-gray-600 mb-2">
                  {metric.title}
               </p>
               <p className="text-3xl font-bold text-gray-900 mb-3">
                  {metric.value}
               </p>

               {/* Trend Indicator */}
               <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                     {isPositive ? (
                        <TrendingUpIcon className="w-4 h-4 text-emerald-500" />
                     ) : (
                        <TrendingDownIcon className="w-4 h-4 text-red-500" />
                     )}
                     <span
                        className={`text-sm font-semibold ${
                           isPositive ? "text-emerald-600" : "text-red-600"
                        }`}>
                        {metric.change}
                     </span>
                  </div>
                  <span className="text-xs text-gray-500">{metric.period}</span>
               </div>
            </div>

            {/* Icon */}
            <div className="relative">
               <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bgGradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default StatCard;
