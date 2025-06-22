import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../Layout/DashboardLayout";
import WelcomeSection from "./WelcomeSection";
import MetricsGrid from "./MetricsGrid";
import ApiKeysSection from "./ApiKeysSection";
import TransactionsTable from "./TransactionsTable";

const DashboardContent = () => {
   const router = useRouter();
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [dashboardData, setDashboardData] = useState(null);

   // Auth check and data loading
   useEffect(() => {
      const initializeDashboard = async () => {
         try {
            // Replace with your auth logic
            const userData = {
               firstName: "Jane",
               lastName: "Doe",
               email: "jane@aboki.com",
            };

            // Replace with your API calls
            const data = await fetchDashboardData();

            setUser(userData);
            setDashboardData(data);
         } catch (error) {
            console.error("Dashboard initialization failed:", error);
            router.push("/auth/signin");
         } finally {
            setLoading(false);
         }
      };

      initializeDashboard();
   }, [router]);

   const handleLogout = async () => {
      try {
         // Your logout logic here
         router.push("/auth/signin");
      } catch (error) {
         console.error("Logout failed:", error);
      }
   };

   // Loading state
   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
               <p className="text-gray-600">Loading dashboard...</p>
            </div>
         </div>
      );
   }

   // Not authenticated
   if (!user) {
      return null;
   }

   return (
      <DashboardLayout user={user} onLogout={handleLogout}>
         <div className="p-6 space-y-8">
            <WelcomeSection user={user} />
            <MetricsGrid metrics={dashboardData?.metrics} />
            <ApiKeysSection apiKeys={dashboardData?.apiKeys} />
            <TransactionsTable transactions={dashboardData?.transactions} />
         </div>
      </DashboardLayout>
   );
};

// Mock data fetcher - replace with your API
const fetchDashboardData = async () => {
   // Simulate API call
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve({
            metrics: [
               {
                  id: 1,
                  title: "Total Users",
                  value: "40,689",
                  change: "+8.5%",
                  trend: "up",
                  period: "from yesterday",
                  iconType: "users",
               },
               {
                  id: 2,
                  title: "Total Orders",
                  value: "10,293",
                  change: "+1.3%",
                  trend: "up",
                  period: "from past week",
                  iconType: "orders",
               },
               {
                  id: 3,
                  title: "Total Order Volume",
                  value: "$89,000",
                  change: "-4.3%",
                  trend: "down",
                  period: "from yesterday",
                  iconType: "volume",
               },
               {
                  id: 4,
                  title: "Total Fee Earnings",
                  value: "2040",
                  change: "+1.8%",
                  trend: "up",
                  period: "from yesterday",
                  iconType: "earnings",
               },
            ],
            transactions: [
               {
                  id: 1,
                  date: "Jun 13, 08:42 AM",
                  asset: "Bitcoin",
                  type: "Off-ramp",
                  amount: "₦100,000",
                  txType: "Buy Crypto",
                  refId: "#1983.23",
                  status: "Success",
               },
               {
                  id: 2,
                  date: "Jun 13, 08:40 AM",
                  asset: "Ethereum",
                  type: "On-ramp",
                  amount: "₦75,500",
                  txType: "Sell Crypto",
                  refId: "#1982.11",
                  status: "Pending",
               },
               {
                  id: 3,
                  date: "Jun 13, 08:38 AM",
                  asset: "Bitcoin",
                  type: "Off-ramp",
                  amount: "₦200,000",
                  txType: "Buy Crypto",
                  refId: "#1981.45",
                  status: "Success",
               },
               {
                  id: 4,
                  date: "Jun 12, 11:22 PM",
                  asset: "USDT",
                  type: "Transfer",
                  amount: "₦50,000",
                  txType: "P2P Trade",
                  refId: "#1980.78",
                  status: "Failed",
               },
            ],
            apiKeys: {
               clientId: "uin2 23u23n 2iu3ni 2i23n n23ni i2n3",
               clientSecret: "uin2 23u23n 2iu3ni 2i23n n23ni i2n3",
            },
         });
      }, 500);
   });
};

export default DashboardContent;
