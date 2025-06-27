import { useState, useRef, useEffect } from "react";
import {
   ChevronLeftIcon,
   ChevronRightIcon,
   BellIcon,
   Bars3Icon,
   UserCircleIcon,
   CogIcon,
   ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const ProfileDropdown = ({ isOpen, onClose, user, onLogout }) => {
   const dropdownRef = useRef(null);
   const router = useRouter();

   // Close dropdown when clicking outside
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            onClose();
         }
      };

      if (isOpen) {
         document.addEventListener("mousedown", handleClickOutside);
         document.addEventListener("touchstart", handleClickOutside);
      }

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
         document.removeEventListener("touchstart", handleClickOutside);
      };
   }, [isOpen, onClose]);

   if (!isOpen) return null;

   return (
      <div
         ref={dropdownRef}
         className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50 animate-in slide-in-from-top-2 duration-200">
         <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900 capitalize">
               {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-gray-500">{user?.email}</p>
         </div>
         <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
            <UserCircleIcon className="w-4 h-4 mr-3" />
            Profile
         </a>
         <button
            onClick={() => router.push("/settings")}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
            <CogIcon className="w-4 h-4 mr-3" />
            Settings
         </button>
         <div className="border-t border-gray-200 my-1"></div>
         <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
            <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
            Logout
         </button>
      </div>
   );
};

const TopBar = ({
   user,
   onLogout,
   onSidebarToggle,
   onMobileMenuToggle,
   sidebarCollapsed,
   testMode,
   onTestModeToggle,
}) => {
   const [profileOpen, setProfileOpen] = useState(false);

   return (
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <button
               onClick={onMobileMenuToggle}
               className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
               <Bars3Icon className="w-8 h-8" />
            </button>
            <button
               onClick={onSidebarToggle}
               className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
               {sidebarCollapsed ? (
                  <ChevronRightIcon className="w-5 h-5 transition-transform duration-200" />
               ) : (
                  <ChevronLeftIcon className="w-5 h-5 transition-transform duration-200" />
               )}
            </button>
         </div>

         <div className="flex items-center space-x-3 sm:space-x-6">
            {/* Test Mode Toggle - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-3">
               <span className="text-sm text-gray-600 font-medium">
                  Test mode
               </span>
               <button
                  onClick={onTestModeToggle}
                  className={`relative w-11 h-6 rounded-full transition-all duration-200 ${
                     testMode ? "bg-purple-600" : "bg-gray-300"
                  }`}>
                  <div
                     className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform duration-200 ${
                        testMode ? "translate-x-6" : "translate-x-1"
                     }`}></div>
               </button>
            </div>

            {/* Notifications */}
            <div className="relative">
               <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                  <BellIcon className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                     3
                  </span>
               </button>
            </div>

            {/* Company Name - Hidden on small screens */}
            <span className="hidden sm:block text-sm font-medium text-gray-900">
               {user?.businessName || "Your Business"}
            </span>

            {/* Profile */}
            <div className="relative">
               <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 hover:border-purple-600 transition-colors">
                  <img
                     src="/default.jpeg"
                     alt="Profile"
                     className="w-full h-full object-cover"
                  />
               </button>
               <ProfileDropdown
                  isOpen={profileOpen}
                  onClose={() => setProfileOpen(false)}
                  user={user}
                  onLogout={onLogout}
               />
            </div>
         </div>
      </header>
   );
};

export default TopBar;
