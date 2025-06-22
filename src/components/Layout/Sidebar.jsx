import {
   Bars3Icon,
   XMarkIcon,
   Cog6ToothIcon as CogIcon,
   ArrowRightOnRectangleIcon,
   SparklesIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Link from "next/link";

const Sidebar = ({ isCollapsed, onToggle, isMobile, onMobileClose }) => {
   const router = useRouter();

   const navItems = [
      {
         name: "Dashboard",
         href: "/dashboard",
         active: router.pathname === "/dashboard",
         icon: "📊",
      },
      {
         name: "Transactions",
         href: "/transactions",
         active: router.pathname === "/transactions",
         icon: "💰",
      },
      {
         name: "Exchange",
         href: "/exchange",
         active: router.pathname === "/exchange",
         icon: "🔄",
      },
      {
         name: "Liquidity",
         href: "/liquidity",
         active: router.pathname === "/liquidity",
         icon: "💧",
      },
      {
         name: "Settings",
         href: "/settings",
         active: router.pathname === "/settings",
         icon: "⚙️",
      },
   ];

   const sidebarContent = (
      <div className="flex flex-col h-full bg-white">
         {/* Logo Section */}
         <div className="flex items-center justify-between p-6 border-b border-gray-100">
            {!isCollapsed && (
               <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                     <SparklesIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">Aboki</span>
               </div>
            )}
            {isMobile && (
               <button
                  onClick={onMobileClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden">
                  <XMarkIcon className="w-5 h-5" />
               </button>
            )}
         </div>

         {/* Navigation */}
         <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
               <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                     item.active
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                        : "text-gray-700 hover:bg-gray-100"
                  }`}>
                  <span className="text-lg">{item.icon}</span>
                  {!isCollapsed && <span>{item.name}</span>}
               </Link>
            ))}
         </nav>

         {/* Logout Section */}
         <div className="p-4 border-t border-gray-100">
            <button className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
               <ArrowRightOnRectangleIcon className="w-5 h-5" />
               {!isCollapsed && <span>Logout</span>}
            </button>
         </div>
      </div>
   );

   if (isMobile) {
      return (
         <div className="fixed inset-0 z-50 lg:hidden">
            <div
               className="fixed inset-0 bg-black/50"
               onClick={onMobileClose}></div>
            <div className="fixed left-0 top-0 h-full w-80 shadow-xl transform transition-transform duration-300">
               {sidebarContent}
            </div>
         </div>
      );
   }

   return (
      <div
         className={`hidden lg:flex flex-col transition-all duration-300 ${
            isCollapsed ? "w-20" : "w-64"
         }`}>
         {sidebarContent}
      </div>
   );
};

export default Sidebar;
