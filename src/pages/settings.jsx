import { useState } from "react";
import Head from "next/head";
import DashboardLayout from "../components/Layout/DashboardLayout";
import {
   UserCircleIcon,
   KeyIcon,
   ShieldCheckIcon,
   BellIcon,
   CreditCardIcon,
   GlobeAltIcon,
   DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

const SettingsSection = ({ title, description, icon: Icon, children }) => {
   return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
         <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
               <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
               <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {title}
               </h3>
               <p className="text-sm text-gray-600">{description}</p>
            </div>
         </div>
         {children}
      </div>
   );
};

const ProfileSettings = () => {
   const [formData, setFormData] = useState({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@aboki.com",
      phone: "+234 801 234 5678",
      company: "FlyMond",
   });

   return (
      <SettingsSection
         title="Profile Information"
         description="Update your personal information and contact details"
         icon={UserCircleIcon}>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
               </label>
               <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                     setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
               </label>
               <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                     setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
               </label>
               <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                     setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
               </label>
               <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                     setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
               />
            </div>
            <div className="md:col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
               </label>
               <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                     setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
               />
            </div>
         </div>
         <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-end space-x-3">
               <button className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Cancel
               </button>
               <button className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Save Changes
               </button>
            </div>
         </div>
      </SettingsSection>
   );
};

const SecuritySettings = () => {
   const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

   return (
      <SettingsSection
         title="Security Settings"
         description="Manage your account security and authentication"
         icon={ShieldCheckIcon}>
         <div className="space-y-6">
            {/* Password Change */}
            <div>
               <h4 className="font-medium text-gray-900 mb-3">
                  Change Password
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                     </label>
                     <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                     </label>
                     <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     />
                  </div>
               </div>
            </div>

            {/* Two Factor Authentication */}
            <div className="border-t border-gray-200 pt-6">
               <div className="flex items-center justify-between">
                  <div>
                     <h4 className="font-medium text-gray-900">
                        Two-Factor Authentication
                     </h4>
                     <p className="text-sm text-gray-600 mt-1">
                        Add an extra layer of security to your account
                     </p>
                  </div>
                  <button
                     onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                     className={`relative w-11 h-6 rounded-full transition-colors ${
                        twoFactorEnabled ? "bg-purple-600" : "bg-gray-300"
                     }`}>
                     <div
                        className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                           twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                        }`}></div>
                  </button>
               </div>
            </div>

            {/* Active Sessions */}
            <div className="border-t border-gray-200 pt-6">
               <h4 className="font-medium text-gray-900 mb-3">
                  Active Sessions
               </h4>
               <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                     <div className="flex items-center space-x-3">
                        <DevicePhoneMobileIcon className="w-5 h-5 text-gray-400" />
                        <div>
                           <p className="text-sm font-medium text-gray-900">
                              iPhone 13 Pro
                           </p>
                           <p className="text-xs text-gray-500">
                              Lagos, Nigeria • Current session
                           </p>
                        </div>
                     </div>
                     <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Active
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </SettingsSection>
   );
};

const NotificationSettings = () => {
   const [notifications, setNotifications] = useState({
      email: true,
      push: true,
      sms: false,
      marketing: false,
   });

   const toggleNotification = (type) => {
      setNotifications((prev) => ({
         ...prev,
         [type]: !prev[type],
      }));
   };

   return (
      <SettingsSection
         title="Notification Preferences"
         description="Choose how you want to receive notifications"
         icon={BellIcon}>
         <div className="space-y-4">
            {[
               {
                  key: "email",
                  label: "Email Notifications",
                  description: "Receive transaction updates via email",
               },
               {
                  key: "push",
                  label: "Push Notifications",
                  description: "Get instant notifications on your device",
               },
               {
                  key: "sms",
                  label: "SMS Notifications",
                  description: "Receive important alerts via text message",
               },
               {
                  key: "marketing",
                  label: "Marketing Communications",
                  description: "Product updates and promotional offers",
               },
            ].map((item) => (
               <div
                  key={item.key}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                     <h4 className="font-medium text-gray-900">{item.label}</h4>
                     <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <button
                     onClick={() => toggleNotification(item.key)}
                     className={`relative w-11 h-6 rounded-full transition-colors ${
                        notifications[item.key]
                           ? "bg-purple-600"
                           : "bg-gray-300"
                     }`}>
                     <div
                        className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                           notifications[item.key]
                              ? "translate-x-6"
                              : "translate-x-1"
                        }`}></div>
                  </button>
               </div>
            ))}
         </div>
      </SettingsSection>
   );
};

const SettingsPage = () => {
   // Mock user data - replace with your auth
   const user = { firstName: "Jane", lastName: "Doe", email: "jane@aboki.com" };

   const handleLogout = () => {
      // Your logout logic
   };

   return (
      <>
         <Head>
            <title>Settings - Aboki</title>
            <meta name="description" content="Manage your account settings" />
         </Head>

         <DashboardLayout user={user} onLogout={handleLogout}>
            <div className="p-6">
               {/* Page Header */}
               <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                     Settings
                  </h1>
                  <p className="text-gray-600">
                     Manage your account preferences and security settings
                  </p>
               </div>

               {/* Settings Sections */}
               <div className="space-y-8">
                  <ProfileSettings />
                  <SecuritySettings />
                  <NotificationSettings />
               </div>
            </div>
         </DashboardLayout>
      </>
   );
};

export default SettingsPage;
