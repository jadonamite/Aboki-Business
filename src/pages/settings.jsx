import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import DashboardLayout from "../components/Layout/DashboardLayout";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ui/ToastContainer";
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

const ProfileSettings = ({ user, onUpdate, loading }) => {
   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      businessName: "",
   });

   const [hasChanges, setHasChanges] = useState(false);

   // Initialize form data when user changes
   useEffect(() => {
      if (user) {
         const newFormData = {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            businessName: user.businessName || "",
         };
         setFormData(newFormData);
      }
   }, [user]);

   // Check for changes
   useEffect(() => {
      if (user) {
         const hasChanged = 
            formData.firstName !== user.firstName ||
            formData.lastName !== user.lastName ||
            formData.email !== user.email ||
            formData.phoneNumber !== user.phoneNumber ||
            formData.businessName !== user.businessName;
         setHasChanges(hasChanged);
      }
   }, [formData, user]);

   const handleInputChange = (field, value) => {
      setFormData(prev => ({
         ...prev,
         [field]: value
      }));
   };

   const handleSubmit = () => {
      onUpdate(formData);
   };

   const handleCancel = () => {
      if (user) {
         setFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            businessName: user.businessName || "",
         });
      }
   };

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
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your first name"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
               </label>
               <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your last name"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
               </label>
               <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
               </label>
               <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your phone number"
               />
            </div>
            <div className="md:col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
               </label>
               <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your business name"
               />
            </div>
         </div>
         <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-end space-x-3">
               <button 
                  onClick={handleCancel}
                  disabled={!hasChanges || loading}
                  className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Cancel
               </button>
               <button 
                  onClick={handleSubmit}
                  disabled={!hasChanges || loading}
                  className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
                  {loading && (
                     <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                  )}
                  <span>{loading ? 'Saving...' : 'Save Changes'}</span>
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
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter current password"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                     </label>
                     <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter new password"
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
                              Current Device
                           </p>
                           <p className="text-xs text-gray-500">
                              Lagos, Nigeria • Active now
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
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
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
   const { user, logout, updateUser } = useAuth();
   const { toasts, showSuccess, showError, hideToast } = useToast();
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const handleLogout = () => {
      logout();
      router.push('/auth/signin');
   };

   const handleUpdateProfile = async (updatedData) => {
      setLoading(true);
      try {
         const result = await updateUser(updatedData);
         
         if (result.success) {
            showSuccess('✅ Profile updated successfully!');
         } else {
            showError(`❌ Failed to update profile: ${result.error}`);
         }
      } catch (error) {
         console.error('Profile update error:', error);
         showError('❌ An unexpected error occurred while updating your profile.');
      } finally {
         setLoading(false);
      }
   };

   // Redirect if not authenticated
   if (!user) {
      router.push('/auth/signin');
      return null;
   }

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
                  <ProfileSettings 
                     user={user} 
                     onUpdate={handleUpdateProfile}
                     loading={loading}
                  />
                  <SecuritySettings />
                  <NotificationSettings />
               </div>
            </div>
         </DashboardLayout>

         {/* Toast Container */}
         <ToastContainer toasts={toasts} onHideToast={hideToast} />
      </>
   );
};

export default SettingsPage;