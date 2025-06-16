import { useState, useCallback } from "react";

export const useForm = ({ initialValues, validationSchema, onSubmit }) => {
   const [values, setValues] = useState(initialValues);
   const [errors, setErrors] = useState({});
   const [touched, setTouched] = useState({});

   const handleChange = useCallback(
      (e) => {
         const { name, value, type, checked } = e.target;
         const newValue = type === "checkbox" ? checked : value;

         setValues((prev) => ({
            ...prev,
            [name]: newValue,
         }));

         // Clear error when user starts typing
         if (errors[name]) {
            setErrors((prev) => ({
               ...prev,
               [name]: "",
            }));
         }
      },
      [errors]
   );

   const handleBlur = useCallback(
      (e) => {
         const { name } = e.target;
         setTouched((prev) => ({
            ...prev,
            [name]: true,
         }));

         // Validate field on blur
         if (validationSchema) {
            const fieldErrors = validationSchema(values);
            if (fieldErrors[name]) {
               setErrors((prev) => ({
                  ...prev,
                  [name]: fieldErrors[name],
               }));
            }
         }
      },
      [values, validationSchema]
   );

   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault();

         // Validate all fields
         if (validationSchema) {
            const formErrors = validationSchema(values);
            const hasErrors = Object.keys(formErrors).length > 0;

            setErrors(formErrors);
            setTouched(
               Object.keys(values).reduce(
                  (acc, key) => ({
                     ...acc,
                     [key]: true,
                  }),
                  {}
               )
            );

            if (hasErrors) {
               return;
            }
         }

         // Submit form
         onSubmit(values);
      },
      [values, validationSchema, onSubmit]
   );

   const setError = useCallback((field, message) => {
      setErrors((prev) => ({
         ...prev,
         [field]: message,
      }));
   }, []);

   const resetForm = useCallback(() => {
      setValues(initialValues);
      setErrors({});
      setTouched({});
   }, [initialValues]);

   return {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      setError,
      resetForm,
   };
};
