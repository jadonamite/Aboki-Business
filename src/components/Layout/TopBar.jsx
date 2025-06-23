import { useState } from "react";
import {
   ChevronLeftIcon,
   BellIcon,
   Bars3Icon,
   UserCircleIcon,
   CogIcon,
   ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const ProfileDropdown = ({ isOpen, onClose, user, onLogout }) => {
   if (!isOpen) return null;

   return (
      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
         <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">
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
         <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
            <CogIcon className="w-4 h-4 mr-3" />
            Settings
         </a>
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

const TopBar = ({ user, onLogout, onSidebarToggle, onMobileMenuToggle }) => {
   const [profileOpen, setProfileOpen] = useState(false);
   const [isDark, setIsDark] = useState(false);

   return (
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <button
               onClick={onMobileMenuToggle}
               className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
               <Bars3Icon className="w-5 h-5" />
            </button>
            <button
               onClick={onSidebarToggle}
               className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors">
               <ChevronLeftIcon className="w-5 h-5" />
            </button>
         </div>

         <div className="flex items-center space-x-6">
            {/* Test Mode Toggle */}
            <div className="flex items-center space-x-3">
               <span className="text-sm text-gray-600">Test mode</span>
               <button
                  onClick={() => setIsDark(!isDark)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                     isDark ? "bg-purple-600" : "bg-gray-300"
                  }`}>
                  <div
                     className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                        isDark ? "translate-x-6" : "translate-x-1"
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

            {/* Company Name */}
            <span className="text-sm font-medium text-gray-900">FlyMond</span>

            {/* Profile */}
            <div className="relative">
               <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 hover:border-purple-600 transition-colors">
                  <img
                     src="/default.jpeg"
                     alt="Change"
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
