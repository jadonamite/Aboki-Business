const WelcomeSection = ({ user }) => {
   const currentHour = new Date().getHours();

   const getGreeting = () => {
      if (currentHour < 12) return "Good morning";
      if (currentHour < 17) return "Good afternoon";
      return "Good evening";
   };

   return (
      <div className="flex items-center gap-8 ">
         <div className="relative shrink-0">
            <img
               src="/default.jpeg"
               alt="User"
               className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
               <span className="text-[9px] sm:text-[11px] text-white">✓</span>
            </div>
         </div>
         <div>
            <h1 className=" sm:text-2xl font-bold text-gray-900 text-xl">
               {getGreeting()}, {user?.firstName}!
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
               Welcome back to your dashboard. Here's what's happening today.
            </p>
         </div>
      </div>
   );
};

export default WelcomeSection;
