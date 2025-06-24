import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import {
   HomeIcon,
   ArrowLeftIcon,
   MagnifyingGlassIcon,
   ChartBarIcon,
   CreditCardIcon,
   ArrowsRightLeftIcon,
   Cog6ToothIcon,
   ChatBubbleLeftRightIcon,
   QuestionMarkCircleIcon,
   ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { SiBitcoin, SiEthereum, SiTether, SiLitecoin } from "react-icons/si";
import { FaGem } from "react-icons/fa";

const FloatingIcon = ({ children, className, delay = 0 }) => {
   return (
      <div
         className={`absolute ${className}`}
         style={{
            animation: `float 6s ease-in-out infinite`,
            animationDelay: `${delay}s`,
         }}>
         <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center font-bold text-white">
            {children}
         </div>
      </div>
   );
};

const Custom404 = () => {
   const router = useRouter();
   const [searchQuery, setSearchQuery] = useState("");
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

   // Handle mouse movement for interactive floating elements
   useEffect(() => {
      const handleMouseMove = (e) => {
         setMousePosition({
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight,
         });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
   }, []);

   const goHome = () => {
      router.push("/dashboard");
   };

   const goBack = () => {
      if (window.history.length > 1) {
         router.back();
      } else {
         router.push("/dashboard");
      }
   };

   const handleSearch = (e) => {
      if (e.key === "Enter") {
         const query = searchQuery.toLowerCase();

         // Smart routing based on search terms
         if (query.includes("dashboard") || query.includes("home")) {
            router.push("/dashboard");
         } else if (
            query.includes("transaction") ||
            query.includes("history")
         ) {
            router.push("/transactions");
         } else if (query.includes("exchange") || query.includes("trade")) {
            router.push("/exchange");
         } else if (query.includes("setting") || query.includes("profile")) {
            router.push("/settings");
         } else if (query.includes("sign") || query.includes("login")) {
            router.push("/auth/signin");
         } else {
            router.push("/dashboard");
         }
      }
   };

   const quickLinks = [
      { name: "Dashboard", href: "/dashboard", icon: ChartBarIcon },
      { name: "Transactions", href: "/transactions", icon: CreditCardIcon },
      { name: "Exchange", href: "/exchange", icon: ArrowsRightLeftIcon },
      { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
   ];

   return (
      <>
         <Head>
            <title>404 - Page Not Found | Aboki</title>
            <meta
               name="description"
               content="Page not found - Aboki Crypto Platform"
            />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/assets/icons/abokiicon.svg" />
         </Head>

         <div className="min-h-screen overflow-hidden relative">
            {/* Animated gradient background */}
            <div
               className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500"
               style={{
                  background:
                     "linear-gradient(-45deg, #8B5CF6, #A855F7, #C084FC, #D8B4FE)",
                  backgroundSize: "400% 400%",
                  animation: "gradient-shift 8s ease infinite",
               }}
            />

            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               <FloatingIcon
                  className="top-20 left-10 w-16 h-16 text-2xl"
                  delay={0}>
                  <SiBitcoin className="text-orange-400" />
               </FloatingIcon>
               <FloatingIcon
                  className="top-40 right-20 w-12 h-12 text-xl"
                  delay={2}>
                  <SiEthereum className="text-blue-400" />
               </FloatingIcon>
               <FloatingIcon
                  className="bottom-40 left-20 w-14 h-14 text-xl"
                  delay={4}>
                  <SiTether className="text-green-400" />
               </FloatingIcon>
               <FloatingIcon
                  className="bottom-20 right-10 w-10 h-10 text-lg"
                  delay={1}>
                  <FaGem className="text-purple-300" />
               </FloatingIcon>
               <FloatingIcon
                  className="top-1/2 left-5 w-8 h-8 text-sm"
                  delay={3}>
                  <SiLitecoin className="text-indigo-300" />
               </FloatingIcon>

               {/* Additional decorative elements */}
               <div className="absolute top-60 left-1/4 w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
               <div
                  className="absolute bottom-60 right-1/3 w-6 h-6 bg-white/15 rounded-full animate-pulse"
                  style={{ animationDelay: "1.5s" }}></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
               <div className="text-center max-w-2xl mx-auto">
                  {/* Logo Section */}
                  <div className="mb-8 flex justify-center">
                     <div
                        className="animate-bounce"
                        style={{ animationDuration: "3s" }}>
                        <Image
                           src="/assets/icons/abokiicon.svg"
                           alt="Aboki Logo"
                           width={96}
                           height={96}
                           className="drop-shadow-2xl"
                           style={{
                              filter:
                                 "drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))",
                           }}
                           priority // Loads the image immediately
                        />
                     </div>
                  </div>

                  {/* 404 Text */}
                  <div className="mb-6">
                     <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 drop-shadow-2xl">
                        4<span className="text-purple-200">0</span>4
                     </h1>
                     <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2 drop-shadow-lg">
                        Oops! Page Not Found
                     </h2>
                     <p className="text-base text-purple-100 max-w-md mx-auto leading-relaxed">
                        Looks like you've taken a detour from your Aboki
                        journey. No worries – let's redirect you back to
                        managing your crypto business operations!
                     </p>
                  </div>

                  {/* Search Bar
                  <div className="mb-8">
                     <div
                        className="rounded-2xl p-1 max-w-md mx-auto shadow-2xl"
                        style={{
                           background: "rgba(255, 255, 255, 0.95)",
                           backdropFilter: "blur(20px)",
                        }}>
                        <div className="flex items-center">
                           <div className="flex-1">
                              <input
                                 type="text"
                                 placeholder="Search for pages, features, or help..."
                                 className="w-full px-6 py-4 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-lg"
                                 value={searchQuery}
                                 onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                 }
                                 onKeyPress={handleSearch}
                              />
                           </div>
                           <button
                              onClick={() => handleSearch({ key: "Enter" })}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                              <MagnifyingGlassIcon className="w-5 h-5" />
                           </button>
                        </div>
                     </div>
                  </div> */}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                     <button
                        onClick={goHome}
                        className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl font-semibold text-lg min-w-[200px] flex items-center justify-center gap-3">
                        <HomeIcon className="w-5 h-5" />
                        Go Home
                     </button>
                     <button
                        onClick={goBack}
                        className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl font-semibold text-lg min-w-[200px] flex items-center justify-center gap-3">
                        <ArrowLeftIcon className="w-5 h-5" />
                        Go Back
                     </button>
                  </div>

                  {/* Quick Links */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-lg mx-auto shadow-2xl">
                     <h3 className="text-white font-semibold text-xl mb-4">
                        Popular Destinations
                     </h3>
                     <div className="grid grid-cols-2 gap-3 text-sm">
                        {quickLinks.map((link, index) => {
                           const IconComponent = link.icon;
                           return (
                              <button
                                 key={index}
                                 onClick={() => router.push(link.href)}
                                 className="text-purple-100 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-white/10 text-left flex items-center gap-3">
                                 <IconComponent className="w-4 h-4" />
                                 {link.name}
                              </button>
                           );
                        })}
                     </div>
                  </div>

                  {/* Help Section */}
                  <div className="mt-8 text-center">
                     <p className="text-purple-100 text-sm mb-4 flex items-center justify-center gap-2">
                        <QuestionMarkCircleIcon className="w-4 h-4" />
                        Still lost? Our support team is here to help!
                     </p>
                     <div className="flex justify-center gap-4 text-xs">
                        <button className="text-purple-200 hover:text-white transition-colors underline flex items-center gap-1">
                           <ChatBubbleLeftRightIcon className="w-3 h-3" />
                           Contact Support
                        </button>
                        <span className="text-purple-300">•</span>
                        <button className="text-purple-200 hover:text-white transition-colors underline flex items-center gap-1">
                           <QuestionMarkCircleIcon className="w-3 h-3" />
                           Help Center
                        </button>
                        <span className="text-purple-300">•</span>
                        <button className="text-purple-200 hover:text-white transition-colors underline flex items-center gap-1">
                           <ExclamationTriangleIcon className="w-3 h-3" />
                           Report Bug
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
               @keyframes float {
                  0%,
                  100% {
                     transform: translateY(0px) rotate(0deg);
                  }
                  50% {
                     transform: translateY(-20px) rotate(5deg);
                  }
               }

               @keyframes gradient-shift {
                  0% {
                     background-position: 0% 50%;
                  }
                  50% {
                     background-position: 100% 50%;
                  }
                  100% {
                     background-position: 0% 50%;
                  }
               }
            `}</style>
         </div>
      </>
   );
};

export default Custom404;
