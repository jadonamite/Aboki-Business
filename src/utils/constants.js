export const API_ENDPOINTS = {
   LOGIN: "/api/auth/login",
   REGISTER: "/api/auth/register",
   LOGOUT: "/api/auth/logout",
   VALIDATE_TOKEN: "/api/auth/validate",
   FORGOT_PASSWORD: "/api/auth/forgot-password",
   RESET_PASSWORD: "/api/auth/reset-password",
};

export const ROUTES = {
   SIGN_IN: "/auth/signin",
   SIGN_UP: "/auth/signup",
   DASHBOARD: "/dashboard",
   FORGOT_PASSWORD: "/auth/forgot-password",
   RESET_PASSWORD: "/auth/reset-password",
};

export const PHONE_COUNTRY_CODES = [
   { code: "+234", country: "Nigeria", flag: "🇳🇬" },
   { code: "+1", country: "United States", flag: "🇺🇸" },
   { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
   { code: "+91", country: "India", flag: "🇮🇳" },
   { code: "+86", country: "China", flag: "🇨🇳" },
   { code: "+33", country: "France", flag: "🇫🇷" },
   { code: "+49", country: "Germany", flag: "🇩🇪" },
   { code: "+81", country: "Japan", flag: "🇯🇵" },
];

export const PASSWORD_REQUIREMENTS = [
   "At least 8 characters long",
   "Contains at least one uppercase letter",
   "Contains at least one lowercase letter",
   "Contains at least one number",
   "May include special characters (@$!%*?&)",
];

export const FORM_MESSAGES = {
   REQUIRED_FIELD: "This field is required",
   INVALID_EMAIL: "Please enter a valid email address",
   WEAK_PASSWORD: "Password does not meet requirements",
   PHONE_INVALID: "Please enter a valid phone number",
   TERMS_REQUIRED: "You must agree to the terms and conditions",
   SIGN_UP_SUCCESS: "Account created successfully! Please sign in.",
   SIGN_IN_ERROR: "Invalid email or password",
   NETWORK_ERROR: "Network error. Please try again.",
   GENERIC_ERROR: "An error occurred. Please try again.",
};
