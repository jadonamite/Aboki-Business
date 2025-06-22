// src/components/ui/ToastContainer.jsx
import React from "react";
import Toast from "./Toast";

// ToastContainer Component
export const ToastContainer = ({ toasts, onHideToast }) => {
   return (
      <>
         {toasts.map((toast, index) => (
            <div key={toast.id} style={{ zIndex: 1000 + index }}>
               <Toast
                  message={toast.message}
                  type={toast.type}
                  isVisible={toast.isVisible}
                  onClose={() => onHideToast(toast.id)}
                  duration={toast.duration}
               />
            </div>
         ))}
      </>
   );
};
