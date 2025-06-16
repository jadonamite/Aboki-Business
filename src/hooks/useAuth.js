import {
   useState,
   useEffect,
   useContext,
   createContext,
   useCallback,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   // ADD THESE MISSING FUNCTIONS:
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
            if (typeof window !== "undefined") {
               localStorage.setItem("token", data.token);
            }
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
      if (typeof window !== "undefined") {
         localStorage.removeItem("token");
      }
      setUser(null);
   };

   // Make checkAuth a useCallback to prevent infinite re-renders
   const checkAuth = useCallback(async () => {
      try {
         if (typeof window !== "undefined") {
            // Add this check for SSR
            const token = localStorage.getItem("token");
            if (token) {
               const userData = await validateToken(token);
               setUser(userData);
            }
         }
      } catch (error) {
         console.error("Auth check failed:", error);
         if (typeof window !== "undefined") {
            localStorage.removeItem("token");
         }
      } finally {
         setLoading(false);
      }
   }, []); // Empty dependency array since it doesn't depend on any state

   useEffect(() => {
      checkAuth();
   }, [checkAuth]); // Now include checkAuth in the dependency array

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
