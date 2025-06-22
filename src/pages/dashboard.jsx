// pages/dashboard.jsx
import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamic import for dashboard content
const DashboardContent = dynamic(
   () => import("../components/Dashboard/DashboardContent"),
   {
      ssr: false,
      loading: () => (
         <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
               <p className="text-gray-600">Loading dashboard...</p>
            </div>
         </div>
      ),
   }
);

export default function DashboardPage() {
   return (
      <>
         <Head>
            <title>Dashboard - Aboki</title>
            <meta name="description" content="Your crypto business dashboard" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="public/assets/icons/logo.svg" />;
         </Head>
         <DashboardContent />
      </>
   );
}
