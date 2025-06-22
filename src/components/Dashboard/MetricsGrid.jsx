import StatCard from "./StatCard";

const MetricsGrid = ({ metrics = [] }) => {
   if (!metrics || metrics.length === 0) {
      return (
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((index) => (
               <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                  <div className="flex items-start justify-between">
                     <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                        <div className="h-8 bg-gray-200 rounded w-32 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                     </div>
                     <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  </div>
               </div>
            ))}
         </div>
      );
   }

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
         {metrics.map((metric, index) => (
            <StatCard
               key={metric.id || index}
               metric={metric}
               className="animate-fade-in"
               style={{ animationDelay: `${index * 0.1}s` }}
            />
         ))}
      </div>
   );
};

export default MetricsGrid;
