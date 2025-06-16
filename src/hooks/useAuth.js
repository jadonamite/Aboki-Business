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

   // Make checkAuth a useCallback to prevent infinite re-renders
   const checkAuth = useCallback(async () => {
      try {
         const token = localStorage.getItem("token");
         if (token) {
            const userData = await validateToken(token);
            setUser(userData);
         }
      } catch (error) {
         console.error("Auth check failed:", error);
         localStorage.removeItem("token");
      } finally {
         setLoading(false);
      }
   }, []); // Empty dependency array since it doesn't depend on any state

   useEffect(() => {
      checkAuth();
   }, [checkAuth]); // Now include checkAuth in the dependency array

   // ... rest of your auth functions remain the same

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
