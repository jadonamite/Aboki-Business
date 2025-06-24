// src/hooks/useAuth.js
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
   const [mounted, setMounted] = useState(false);

   // Mock user database (replace with real API calls)
   const [mockUsers, setMockUsers] = useState([
      {
         id: 1,
         email: "admin@aboki.com",
         password: "password123",
         firstName: "Admin",
         lastName: "User",
         businessName: "Aboki Business",
         phoneNumber: "+234 801 234 5678",
      },
      {
         id: 2,
         email: "test@test.com",
         password: "test123",
         firstName: "Test",
         lastName: "User",
         businessName: "Test Company",
         phoneNumber: "+234 901 234 5678",
      },
   ]);

   // Handle client-side mounting
   useEffect(() => {
      setMounted(true);
   }, []);

   const updateUser = async (updatedData) => {
      try {
         if (!user) return { success: false, error: "No user logged in" };

         // Simulate API delay
         await new Promise((resolve) => setTimeout(resolve, 1000));

         // Update in mock database
         const updatedUsers = mockUsers.map((u) =>
            u.id === user.id ? { ...u, ...updatedData } : u
         );
         setMockUsers(updatedUsers);

         // Update current user
         const updatedUser = { ...user, ...updatedData };
         setUser(updatedUser);

         // Update localStorage only after component is mounted
         if (mounted && typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(updatedUser));
         }

         return { success: true, user: updatedUser };
      } catch (error) {
         console.error("Update user error:", error);
         return { success: false, error: "Failed to update user information" };
      }
   };

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

         // Store token in localStorage only after component is mounted
         if (mounted && typeof window !== "undefined") {
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
            phoneNumber: userData.phoneNumber,
            // In real app, password would be hashed
            password: userData.password,
         };

         // Add to mock database
         setMockUsers((prev) => [...prev, newUser]);

         console.log("New user registered:", newUser);

         return {
            success: true,
            message: "Account created successfully! Please sign in.",
            user: newUser,
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
      if (mounted && typeof window !== "undefined") {
         localStorage.removeItem("token");
         localStorage.removeItem("user");
      }
   };

   const checkAuth = useCallback(async () => {
      try {
         // Only check localStorage after component is mounted and in browser
         if (mounted && typeof window !== "undefined") {
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
         if (mounted && typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
         }
      } finally {
         setLoading(false);
      }
   }, [mounted]);

   // Only run auth check after component is mounted
   useEffect(() => {
      if (mounted) {
         checkAuth();
      } else {
         // On server-side, just set loading to false
         setLoading(false);
      }
   }, [mounted, checkAuth]);

   const value = {
      user,
      loading,
      login,
      register,
      logout,
      checkAuth,
      updateUser,
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
