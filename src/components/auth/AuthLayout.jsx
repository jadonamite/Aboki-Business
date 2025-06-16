import React from "react";
import Logo from "../assets/icons/logo.svg";

const AuthLayout = ({ children, title, subtitle }) => {
   return (
      <div className="min-h-screen flex">
         {/* Left side - Background Image */}
         <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500">
               <img
                  src="/assets/images/loginImage.jpg"
                  alt="Crypto Background"
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
               />
            </div>

            {/* Animated shapes */}
            <div className="absolute inset-0">
               <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
               <div className="absolute bottom-32 right-32 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
               <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
            </div>

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
               <div className="max-w-md text-center">
                  <h1 className="text-4xl font-bold mb-6">
                     Welcome to the Future of Crypto Business
                  </h1>
                  <p className="text-lg opacity-90 leading-relaxed">
                     Empower your cryptocurrency operations with cutting-edge
                     tools and seamless integration.
                  </p>
               </div>
            </div>
         </div>

         {/* Right side - Form */}
         <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-gray-50">
            <div className="mx-auto w-full max-w-md">
               <div className="text-center mb-8">
                  <Logo className="justify-center mb-6" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                     {title}
                  </h2>
                  {subtitle && <p className="text-gray-600">{subtitle}</p>}
               </div>

               <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  {children}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AuthLayout;
