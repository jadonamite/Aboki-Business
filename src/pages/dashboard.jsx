// src/pages/dashboard.jsx
import dynamic from "next/dynamic";
import Head from "next/head";

// Dashboard component with auth protection
const DashboardComponent = dynamic(
   () =>
      Promise.resolve(() => {
         const { useEffect } = require("react");
         const { useRouter } = require("next/router");
         const { useAuth } = require("../hooks/useAuth");

         const router = useRouter();
         const { user, loading, logout } = useAuth();

         useEffect(() => {
            if (!loading && !user) {
               router.push("/auth/signin");
            }
         }, [user, loading, router]);

         if (loading) {
            return (
               <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
               </div>
            );
         }

         if (!user) {
            return null;
         }

         return (
            <div className="min-h-screen bg-gray-50">
               {/* Header */}
               <header className="bg-white shadow-sm border-b border-gray-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                           <img
                              src="/assets/icons/logo.svg"
                              alt="Aboki"
                              className="h-8 w-8 mr-2"
                           />
                           <span className="text-xl font-bold text-gray-900">
                              Aboki
                           </span>
                        </div>

                        <div className="flex items-center space-x-4">
                           <span className="text-gray-700">
                              Welcome, {user?.firstName}
                           </span>
                           <button
                              onClick={logout}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                              Logout
                           </button>
                        </div>
                     </div>
                  </div>
               </header>

               {/* Main Content */}
               <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="mb-8">
                     <h1 className="text-3xl font-bold text-gray-900">
                        Dashboard
                     </h1>
                     <p className="text-gray-600 mt-2">
                        Manage your crypto business operations
                     </p>
                  </div>

                  {/* Dashboard Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                           <div className="p-2 bg-purple-100 rounded-lg">
                              <svg
                                 className="h-6 w-6 text-purple-600"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                 />
                              </svg>
                           </div>
                           <div className="ml-4">
                              <h3 className="text-lg font-medium text-gray-900">
                                 Wallet Balance
                              </h3>
                              <p className="text-2xl font-bold text-purple-600">
                                 $0.00
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                           <div className="p-2 bg-blue-100 rounded-lg">
                              <svg
                                 className="h-6 w-6 text-blue-600"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                 />
                              </svg>
                           </div>
                           <div className="ml-4">
                              <h3 className="text-lg font-medium text-gray-900">
                                 Transactions
                              </h3>
                              <p className="text-2xl font-bold text-blue-600">
                                 0
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                           <div className="p-2 bg-green-100 rounded-lg">
                              <svg
                                 className="h-6 w-6 text-green-600"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                 />
                              </svg>
                           </div>
                           <div className="ml-4">
                              <h3 className="text-lg font-medium text-gray-900">
                                 Growth
                              </h3>
                              <p className="text-2xl font-bold text-green-600">
                                 +0%
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Success Message */}
                  <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                     <div className="flex items-center">
                        <div className="flex-shrink-0">
                           <svg
                              className="h-5 w-5 text-green-400"
                              viewBox="0 0 20 20"
                              fill="currentColor">
                              <path
                                 fillRule="evenodd"
                                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                 clipRule="evenodd"
                              />
                           </svg>
                        </div>
                        <div className="ml-3">
                           <h3 className="text-sm font-medium text-green-800">
                              🎉 Authentication System Successfully Deployed!
                           </h3>
                           <div className="mt-2 text-sm text-green-700">
                              <p>
                                 Your Aboki authentication system is now live
                                 and working perfectly on Vercel!
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </main>
            </div>
         );
      }),
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
            <link rel="icon" href="public/assets/icons/logo.svg" />
         </Head>
         <DashboardComponent />
      </>
   );
}
