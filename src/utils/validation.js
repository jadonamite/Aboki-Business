export const validateEmail = (email) => {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
};

export const validatePassword = (password) => {
   // At least 8 characters, one uppercase, one lowercase, one number
   const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
   return passwordRegex.test(password);
};

export const validatePhoneNumber = (phone) => {
   // Basic phone number validation
   const phoneRegex = /^\+?[\d\s\-()]{10,15}$/;
   return phoneRegex.test(phone);
};

export const validateSignUp = (values) => {
   const errors = {};

   // Business name validation
   if (!values.businessName.trim()) {
      errors.businessName = "Business name is required";
   } else if (values.businessName.trim().length < 2) {
      errors.businessName = "Business name must be at least 2 characters";
   }

   // First name validation
   if (!values.firstName.trim()) {
      errors.firstName = "First name is required";
   } else if (values.firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters";
   }

   // Last name validation
   if (!values.lastName.trim()) {
      errors.lastName = "Last name is required";
   } else if (values.lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
   }

   // Phone number validation
   if (!values.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
   } else if (!validatePhoneNumber(values.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number";
   }

   // Email validation
   if (!values.email.trim()) {
      errors.email = "Email address is required";
   } else if (!validateEmail(values.email)) {
      errors.email = "Please enter a valid email address";
   }

   // Password validation
   if (!values.password) {
      errors.password = "Password is required";
   } else if (!validatePassword(values.password)) {
      errors.password =
         "Password must be at least 8 characters with uppercase, lowercase, and number";
   }

   // Terms agreement validation
   if (!values.agreeToTerms) {
      errors.agreeToTerms = "You must agree to the terms and conditions";
   }

   return errors;
};

export const validateSignIn = (values) => {
   const errors = {};

   // Email validation
   if (!values.email.trim()) {
      errors.email = "Email address is required";
   } else if (!validateEmail(values.email)) {
      errors.email = "Please enter a valid email address";
   }

   // Password validation
   if (!values.password) {
      errors.password = "Password is required";
   } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
   }

   return errors;
};
