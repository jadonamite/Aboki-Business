import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const DashboardLayout = ({ children, user, onLogout }) => {
   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const [testMode, setTestMode] = useState(false);

   const handleSidebarToggle = () => {
      setSidebarCollapsed(!sidebarCollapsed);
   };

   const handleMobileMenuToggle = () => {
      setMobileMenuOpen(!mobileMenuOpen);
   };

   const handleMobileMenuClose = () => {
      setMobileMenuOpen(false);
   };

   const handleTestModeToggle = () => {
      setTestMode(!testMode);
   };

   return (
      <div className="min-h-screen bg-gray-50 dark:bg-stone-100 flex">
         <Sidebar
            isCollapsed={sidebarCollapsed}
            onToggle={handleSidebarToggle}
            isMobile={mobileMenuOpen}
            onMobileClose={handleMobileMenuClose}
            onLogout={onLogout}
            testMode={testMode}
            onTestModeToggle={handleTestModeToggle}
         />

         <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar
               user={user}
               onLogout={onLogout}
               onSidebarToggle={handleSidebarToggle}
               onMobileMenuToggle={handleMobileMenuToggle}
               sidebarCollapsed={sidebarCollapsed}
               testMode={testMode}
               onTestModeToggle={handleTestModeToggle}
            />

            <main className="flex-1 overflow-auto">{children}</main>
         </div>
      </div>
   );
};

export default DashboardLayout;