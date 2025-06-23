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

const Sidebar = ({ isCollapsed, onToggle, isMobile, onMobileClose }) => {
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
         href: "/exchange",
         active: router.pathname === "#exchange",
         icon: RiExchangeDollarLine,
      },
      {
         name: "Liquidity",
         href: "/liquidity",
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
         <div className="flex items-center justify-between px-6  border-b border-gray-100">
            {!isCollapsed && (
               <div className="flex  space-x-3">
                  <div className="w-20 h-20 relative">
                     <Image
                        src="/assets/icons/logo.svg"
                        alt="Aboki Business Logo"
                        layout="fill"
                        objectFit="contain"
                     />
                  </div>
               </div>
            )}

            {isMobile && (
               <button
                  onClick={onMobileClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden">
                  <HiOutlineXMark className="w-5 h-5" />
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
                  <span className="text-lg">
                     <item.icon />
                  </span>
                  {!isCollapsed && <span>{item.name}</span>}
               </Link>
            ))}
         </nav>
         {/* Logout Section */}
         <div className="p-4 border-t border-gray-100">
            <button className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
               <IoLogOutOutline className="w-5 h-5" />
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
