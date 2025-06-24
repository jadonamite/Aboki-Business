import { useState } from "react";
import {
   IoLogOutOutline,
   IoSettingsSharp,
   IoWaterSharp,
} from "react-icons/io5";
import { MdDashboard, MdOutlineHistory } from "react-icons/md";
import { HiOutlineXMark } from "react-icons/hi2";
import { RiExchangeDollarLine } from "react-icons/ri";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const TestModeToggle = ({ testMode, onToggle, isCollapsed }) => {
   return (
      <div
         className={`px-4 py-3 border-t border-gray-100 ${
            isCollapsed ? "px-2" : ""
         }`}>
         <div
            className={`flex items-center ${
               isCollapsed ? "justify-center" : "justify-between"
            }`}>
            {!isCollapsed && (
               <span className="text-sm text-gray-600 font-medium">
                  Test mode
               </span>
            )}
            <button
               onClick={onToggle}
               className={`relative ${
                  isCollapsed ? "w-8 h-4" : "w-11 h-6"
               } rounded-full transition-all duration-200 ${
                  testMode ? "bg-purple-600" : "bg-gray-300"
               }`}
               title={
                  isCollapsed
                     ? testMode
                        ? "Test mode: ON"
                        : "Test mode: OFF"
                     : undefined
               }>
               <div
                  className={`absolute ${
                     isCollapsed ? "w-3 h-3 top-0.5" : "w-4 h-4 top-1"
                  } bg-white rounded-full transition-transform duration-200 ${
                     testMode
                        ? isCollapsed
                           ? "translate-x-4"
                           : "translate-x-6"
                        : "translate-x-1"
                  }`}></div>
            </button>
         </div>
         {isCollapsed && (
            <div className="text-center mt-1">
               <span className="text-xs text-gray-500">Test</span>
            </div>
         )}
      </div>
   );
};

const Sidebar = ({
   isCollapsed,
   onToggle,
   isMobile,
   onMobileClose,
   onLogout,
   testMode,
   onTestModeToggle,
}) => {
   const router = useRouter();

   const navItems = [
      {
         name: "Dashboard",
         href: "/dashboard",
         active: router.pathname === "/dashboard",
         icon: MdDashboard,
      },
      {
         name: "Transactions",
         href: "/transactions",
         active: router.pathname === "/transactions",
         icon: MdOutlineHistory,
      },
      {
         name: "Exchange",
         href: "#exchange",
         active: router.pathname === "#exchange",
         icon: RiExchangeDollarLine,
      },
      {
         name: "Liquidity",
         href: "#liquidity",
         active: router.pathname === "#liquidity",
         icon: IoWaterSharp,
      },
      {
         name: "Settings",
         href: "/settings",
         active: router.pathname === "/settings",
         icon: IoSettingsSharp,
      },
   ];

   const sidebarContent = (
      <div className="flex flex-col h-full bg-white">
         {/* Logo Section */}
         <div className="flex items-center justify-between px-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 py-4 transition-all duration-500 ease-out">
               <div
                  className={`relative overflow-hidden transition-all duration-500 ease-out ${
                     isCollapsed || isMobile ? "w-8 h-12" : "w-24 h-12"
                  }`}>
                  <div className="transition-all duration-500 ease-out">
                     <Image
                        src={
                           isCollapsed || isMobile
                              ? "/assets/icons/abokiicon.svg"
                              : "/assets/icons/logo.svg"
                        }
                        alt="Aboki Logo"
                        layout="fill"
                        objectFit="contain"
                        className="transition-opacity duration-300"
                     />
                  </div>
               </div>
            </div>

            {isMobile && (
               <button
                  onClick={onMobileClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden">
                  <HiOutlineXMark className="w-5 h-5" />
               </button>
            )}
         </div>

         {/* Test Mode Toggle - Show on mobile or when collapsed */}
         {(isMobile || window.innerWidth < 1024) && (
            <TestModeToggle
               testMode={testMode}
               onToggle={onTestModeToggle}
               isCollapsed={isCollapsed && !isMobile}
            />
         )}

         {/* Navigation */}
         <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
               <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
                     item.active
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25 scale-105"
                        : "text-gray-700 hover:bg-gray-100"
                  }`}>
                  <span
                     className={`text-lg transition-all duration-200 ${
                        item.active
                           ? "text-white"
                           : "text-gray-600 group-hover:text-purple-600"
                     }`}>
                     <item.icon />
                  </span>
                  {!isCollapsed && (
                     <span className="transition-all duration-200">
                        {item.name}
                     </span>
                  )}
               </Link>
            ))}
         </nav>

         {/* Logout Section */}
         <div className="p-4 border-t border-gray-100">
            <button
               onClick={onLogout}
               className="group flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 hover:scale-105">
               <IoLogOutOutline className="w-5 h-5 transition-colors duration-200 group-hover:text-red-600" />
               {!isCollapsed && (
                  <span className="transition-all duration-200">Logout</span>
               )}
            </button>
         </div>
      </div>
   );

   if (isMobile) {
      return (
         <div className="fixed inset-0 z-50 lg:hidden">
            <div
               className="fixed inset-0 bg-black/50 transition-opacity duration-300"
               onClick={onMobileClose}></div>
            <div
               className={`fixed left-0 top-0 h-full w-80 shadow-xl transform transition-all duration-300 ease-out ${
                  isMobile ? "translate-x-0" : "-translate-x-full"
               }`}>
               {sidebarContent}
            </div>
         </div>
      );
   }

   return (
      <div
         className={`hidden lg:flex flex-col transition-all duration-500 ease-out border-r border-gray-100 ${
            isCollapsed ? "w-20" : "w-64"
         }`}>
         {sidebarContent}
      </div>
   );
};

export default Sidebar;
