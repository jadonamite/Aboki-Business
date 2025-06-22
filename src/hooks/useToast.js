import { useState, useCallback } from "react";

export const useToast = () => {
   const [toasts, setToasts] = useState([]);

   const showToast = useCallback((message, type = "info", duration = 5000) => {
      const id = Date.now() + Math.random();
      const newToast = {
         id,
         message,
         type,
         duration,
         isVisible: true,
      };

      setToasts((prev) => [...prev, newToast]);

      // Auto remove toast after duration
      setTimeout(() => {
         setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration + 300); // Extra time for animation

      return id;
   }, []);

   const hideToast = useCallback((id) => {
      setToasts((prev) =>
         prev.map((toast) =>
            toast.id === id ? { ...toast, isVisible: false } : toast
         )
      );

      // Remove from state after animation
      setTimeout(() => {
         setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 300);
   }, []);

   const showSuccess = useCallback(
      (message, duration = 5000) => showToast(message, "success", duration),
      [showToast]
   );

   const showError = useCallback(
      (message, duration = 5000) => showToast(message, "error", duration),
      [showToast]
   );

   const showWarning = useCallback(
      (message, duration = 5000) => showToast(message, "warning", duration),
      [showToast]
   );

   const showInfo = useCallback(
      (message, duration = 5000) => showToast(message, "info", duration),
      [showToast]
   );

   return {
      toasts,
      showToast,
      hideToast,
      showSuccess,
      showError,
      showWarning,
      showInfo,
   };
};
