import { MdDashboard } from "react-icons/md";
import { SiBitcoin, SiEthereum, SiTether } from "react-icons/si";
import { useRouter } from "next/router";

const TransactionRow = ({ transaction }) => {
   const statusColors = {
      Success: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      Pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      Failed: "bg-red-100 text-red-800 border border-red-200",
   };
   const iconMap = {
      Bitcoin: { icon: SiBitcoin, color: "from-orange-400 to-yellow-500" },
      Ethereum: { icon: SiEthereum, color: "from-blue-400 to-purple-500" },
      USDT: { icon: SiTether, color: "from-green-400 to-teal-500" },
   };
   // const getCryptoIcon = (asset) => {

   //    return (
   //       iconMap[asset] || { symbol: "●", color: "from-gray-400 to-gray-500" }
   //    );
   // };
   const router = useRouter();

   const crypto = iconMap[transaction.asset];
   const CryptoIcon = crypto?.icon;

   return (
      <tr className="hover:bg-gray-50 transition-colors">
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {transaction.date}
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center space-x-3">
               <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${crypto.color} flex items-center justify-center text-white shadow-sm`}>
                  {CryptoIcon && <CryptoIcon className="w-4 h-4" />}
               </div>
               <span className="text-sm font-medium text-gray-900">
                  {transaction.asset}
               </span>
            </div>
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
               {transaction.type}
            </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
            {transaction.amount}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {transaction.txType}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
            {transaction.refId}
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
            <span
               className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  statusColors[transaction.status]
               }`}>
               {transaction.status}
            </span>
         </td>
      </tr>
   );
};

const TransactionsTable = ({ transactions = [] }) => {
   return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-bold text-gray-900">
                  Recent Transactions
               </h2>

               <button
                  onClick={() => router.push("/transactions")}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  View all
               </button>
            </div>
         </div>

         {transactions.length === 0 ? (
            <div className="p-12 text-center">
               <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">{MdDashboard}</span>
               </div>
               <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No transactions yet
               </h3>
               <p className="text-gray-500">
                  Your recent transactions will appear here once you start
                  trading.
               </p>
            </div>
         ) : (
            <div className="overflow-x-auto">
               <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                     <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Date/Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Asset
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Operation
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Ref. ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Status
                        </th>
                     </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                     {transactions.map((transaction) => (
                        <TransactionRow
                           key={transaction.id}
                           transaction={transaction}
                        />
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
};

export default TransactionsTable;
