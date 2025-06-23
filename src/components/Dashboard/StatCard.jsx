// components/Dashboard/StatCard.jsx
import React from "react";

import {
   IoTrendingUpOutline,
   IoTrendingDownOutline,
   IoPeopleOutline, // UsersIcon
   IoCubeOutline, // CubeIcon
   IoBarChartOutline, // ChartBarIcon
   IoCashOutline, // CurrencyDollarIcon
} from "react-icons/io5";
import { BsCashCoin, BsGraphUpArrow } from "react-icons/bs";

const StatCard = ({ metric, className = "", style = {} }) => {
   const iconMap = {
      users: IoPeopleOutline,
      orders: IoCubeOutline,
      volume: BsGraphUpArrow,
      earnings: BsCashCoin,
   };

   const Icon = iconMap[metric.iconType] || IoPeopleOutline;
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
                        <IoTrendingUpOutline className="w-4 h-4 text-emerald-500" />
                     ) : (
                        <IoTrendingDownOutline className="w-4 h-4 text-red-500" />
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
