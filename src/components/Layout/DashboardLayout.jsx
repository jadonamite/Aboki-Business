import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const DashboardLayout = ({ children, user, onLogout }) => {
   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

   return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
         <Sidebar
            isCollapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            isMobile={mobileMenuOpen}
            onMobileClose={() => setMobileMenuOpen(false)}
         />

         <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar
               user={user}
               onLogout={onLogout}
               onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
               onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            />

            <main className="flex-1 overflow-auto">{children}</main>
         </div>
      </div>
   );
};

export default DashboardLayout;
