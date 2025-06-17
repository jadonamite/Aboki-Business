// src/components/ui/ToastContainer.jsx
import React from "react";
import Toast from "./Toast";

const ToastContainer = ({ toasts, onHideToast, position = "top-right" }) => {
   return (
      <>
         {toasts.map((toast) => (
            <Toast
               key={toast.id}
               message={toast.message}
               type={toast.type}
               isVisible={toast.isVisible}
               onClose={() => onHideToast(toast.id)}
               duration={toast.duration}
               position={position}
            />
         ))}
      </>
   );
};

export default ToastContainer;
