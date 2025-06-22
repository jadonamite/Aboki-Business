import { useState } from "react";
import Head from "next/head";
import DashboardLayout from "../components/Layout/DashboardLayout";
import {
   MagnifyingGlassIcon,
   FunnelIcon,
   ArrowDownTrayIcon,
   CalendarIcon,
} from "@heroicons/react/24/outline";

const TransactionFilters = ({ onFilterChange }) => {
   const [activeFilter, setActiveFilter] = useState("all");

   const filters = [
      { id: "all", label: "All Transactions", count: 24 },
      { id: "success", label: "Successful", count: 18 },
      { id: "pending", label: "Pending", count: 4 },
      { id: "failed", label: "Failed", count: 2 },
   ];

   return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
               <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
               <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
               />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
               <button className="flex items-center space-x-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Date Range</span>
               </button>
               <button className="flex items-center space-x-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <FunnelIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Filter</span>
               </button>
               <button className="flex items-center space-x-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Export</span>
               </button>
            </div>
         </div>

         {/* Filter Tabs */}
         <div className="flex space-x-1 mt-6 bg-gray-100 rounded-lg p-1">
            {filters.map((filter) => (
               <button
                  key={filter.id}
                  onClick={() => {
                     setActiveFilter(filter.id);
                     onFilterChange?.(filter.id);
                  }}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                     activeFilter === filter.id
                        ? "bg-white text-purple-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                  }`}>
                  {filter.label}{" "}
                  <span className="text-xs opacity-60">({filter.count})</span>
               </button>
            ))}
         </div>
      </div>
   );
};

const TransactionCard = ({ transaction }) => {
   const statusColors = {
      Success: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      Pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      Failed: "bg-red-100 text-red-800 border border-red-200",
   };

   const getCryptoIcon = (asset) => {
      const iconMap = {
         Bitcoin: { symbol: "₿", color: "from-orange-400 to-yellow-500" },
         Ethereum: { symbol: "Ξ", color: "from-blue-400 to-purple-500" },
         USDT: { symbol: "₮", color: "from-green-400 to-teal-500" },
      };
      return (
         iconMap[asset] || { symbol: "●", color: "from-gray-400 to-gray-500" }
      );
   };

   const crypto = getCryptoIcon(transaction.asset);

   return (
      <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
               <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${crypto.color} flex items-center justify-center text-white font-bold shadow-sm`}>
                  {crypto.symbol}
               </div>
               <div>
                  <h3 className="font-semibold text-gray-900">
                     {transaction.asset}
                  </h3>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
               </div>
            </div>
            <span
               className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  statusColors[transaction.status]
               }`}>
               {transaction.status}
            </span>
         </div>

         <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
               <p className="text-gray-500 mb-1">Amount</p>
               <p className="font-semibold text-gray-900">
                  {transaction.amount}
               </p>
            </div>
            <div>
               <p className="text-gray-500 mb-1">Type</p>
               <p className="font-medium text-gray-900">{transaction.txType}</p>
            </div>
            <div>
               <p className="text-gray-500 mb-1">Reference ID</p>
               <p className="font-mono text-xs text-gray-600">
                  {transaction.refId}
               </p>
            </div>
            <div>
               <p className="text-gray-500 mb-1">Method</p>
               <p className="font-medium text-gray-900">{transaction.type}</p>
            </div>
         </div>
      </div>
   );
};

const TransactionsPage = () => {
   const [filteredTransactions, setFilteredTransactions] = useState([]);

   // Mock user data - replace with your auth
   const user = { firstName: "Jane", lastName: "Doe", email: "jane@aboki.com" };

   // Mock transactions data
   const allTransactions = [
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
   ];

   const handleFilterChange = (filterType) => {
      if (filterType === "all") {
         setFilteredTransactions(allTransactions);
      } else {
         const filtered = allTransactions.filter(
            (tx) => tx.status.toLowerCase() === filterType
         );
         setFilteredTransactions(filtered);
      }
   };

   const handleLogout = () => {
      // Your logout logic
   };

   return (
      <>
         <Head>
            <title>Transactions - Aboki</title>
            <meta
               name="description"
               content="View and manage your transactions"
            />
         </Head>

         <DashboardLayout user={user} onLogout={handleLogout}>
            <div className="p-6">
               {/* Page Header */}
               <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                     Transactions
                  </h1>
                  <p className="text-gray-600">
                     View and manage all your crypto transactions
                  </p>
               </div>

               {/* Filters */}
               <TransactionFilters onFilterChange={handleFilterChange} />

               {/* Transactions Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {(filteredTransactions.length > 0
                     ? filteredTransactions
                     : allTransactions
                  ).map((transaction) => (
                     <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                     />
                  ))}
               </div>

               {/* Empty State */}
               {filteredTransactions.length === 0 && (
                  <div className="text-center py-12">
                     <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">📊</span>
                     </div>
                     <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No transactions found
                     </h3>
                     <p className="text-gray-500">
                        Try adjusting your filters or check back later.
                     </p>
                  </div>
               )}
            </div>
         </DashboardLayout>
      </>
   );
};

export default TransactionsPage;
