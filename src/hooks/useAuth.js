// src/hooks/useAuth.js
import {
   useState,
   useEffect,
   useContext,
   createContext,
   useCallback,
} from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   // Mock user database (replace with real API calls)
   const mockUsers = [
      {
         id: 1,
         email: "admin@aboki.com",
         password: "password123",
         firstName: "Admin",
         lastName: "User",
         businessName: "Aboki Business",
      },
      {
         id: 2,
         email: "test@test.com",
         password: "test123",
         firstName: "Test",
         lastName: "User",
         businessName: "Test Company",
      },
   ];

   const login = async (email, password) => {
      try {
         setLoading(true);

         // Simulate API delay
         await new Promise((resolve) => setTimeout(resolve, 1500));

         // Check if user exists
         const userExists = mockUsers.find((u) => u.email === email);

         if (!userExists) {
            return {
               success: false,
               error: "No account found with this email address",
            };
         }

         // Check password
         if (userExists.password !== password) {
            return {
               success: false,
               error: "Incorrect password. Please try again.",
            };
         }

         // Login successful
         const { password: _, ...userWithoutPassword } = userExists;

         // Set user in state
         setUser(userWithoutPassword);

         // Store token in localStorage (browser only)
         if (typeof window !== "undefined") {
            localStorage.setItem("token", `mock-token-${userExists.id}`);
            localStorage.setItem("user", JSON.stringify(userWithoutPassword));
         }

         return { success: true, user: userWithoutPassword };
      } catch (error) {
         console.error("Login error:", error);
         return { success: false, error: "Login failed. Please try again." };
      } finally {
         setLoading(false);
      }
   };

   const register = async (userData) => {
      try {
         setLoading(true);

         // Simulate API delay
         await new Promise((resolve) => setTimeout(resolve, 2000));

         // Check if user already exists
         const existingUser = mockUsers.find((u) => u.email === userData.email);
         if (existingUser) {
            return {
               success: false,
               error: "User with this email already exists",
            };
         }

         // Create new user
         const newUser = {
            id: mockUsers.length + 1,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            businessName: userData.businessName,
            // In real app, password would be hashed
            password: userData.password,
         };

         // Add to mock database (in real app, this would be an API call)
         mockUsers.push(newUser);

         console.log("New user registered:", newUser);

         return {
            success: true,
            message: "Account created successfully! Please sign in.",
         };
      } catch (error) {
         console.error("Registration error:", error);
         return {
            success: false,
            error: "Registration failed. Please try again.",
         };
      } finally {
         setLoading(false);
      }
   };

   const logout = () => {
      setUser(null);
      if (typeof window !== "undefined") {
         localStorage.removeItem("token");
         localStorage.removeItem("user");
      }
   };

   const checkAuth = useCallback(async () => {
      try {
         // Only check localStorage in the browser
         if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (token && storedUser) {
               // In real app, you'd validate the token with your API
               const userData = JSON.parse(storedUser);
               setUser(userData);
            }
         }
      } catch (error) {
         console.error("Auth check failed:", error);
         if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
         }
      } finally {
         setLoading(false);
      }
   }, []);

   useEffect(() => {
      checkAuth();
   }, [checkAuth]);

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
