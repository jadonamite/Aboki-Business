// components/Dashboard/WelcomeSection.jsx

const WelcomeSection = ({ user }) => {
   const currentHour = new Date().getHours();

   const getGreeting = () => {
      if (currentHour < 12) return "Good morning";
      if (currentHour < 17) return "Good afternoon";
      return "Good evening";
   };

   return (
      <div className="flex items-center space-x-4">
         <div className="relative">
            <img
               src="/default.jpeg"
               alt="User"
               className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
               <span className="text-xs text-white">✓</span>
            </div>
         </div>
         <div>
            <h1 className="text-3xl font-bold text-gray-900">
               {getGreeting()}, {user?.firstName}!
            </h1>
            <p className="text-gray-600 mt-1">
               Welcome back to your dashboard. Here's what's happening today.
            </p>
         </div>
      </div>
   );
};

export default WelcomeSection;
