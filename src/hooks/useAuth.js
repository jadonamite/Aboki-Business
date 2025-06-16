import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      // Check if user is logged in on mount
      checkAuth();
   }, []);

   const checkAuth = async () => {
      try {
         const token = localStorage.getItem("token");
         if (token) {
            // Validate token with API
            const userData = await validateToken(token);
            setUser(userData);
         }
      } catch (error) {
         console.error("Auth check failed:", error);
         localStorage.removeItem("token");
      } finally {
         setLoading(false);
      }
   };

   const login = async (email, password) => {
      try {
         const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
         });

         const data = await response.json();

         if (response.ok) {
            localStorage.setItem("token", data.token);
            setUser(data.user);
            return { success: true };
         } else {
            return { success: false, error: data.message };
         }
      } catch (error) {
         return { success: false, error: "Network error" };
      }
   };

   const register = async (userData) => {
      try {
         const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
         });

         const data = await response.json();

         if (response.ok) {
            return { success: true };
         } else {
            return { success: false, error: data.message };
         }
      } catch (error) {
         return { success: false, error: "Network error" };
      }
   };

   const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
   };

   const validateToken = async (token) => {
      const response = await fetch("/api/auth/validate", {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      if (response.ok) {
         return await response.json();
      } else {
         throw new Error("Invalid token");
      }
   };

   const value = {
      user,
      loading,
      login,
      register,
      logout,
      checkAuth,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
};
