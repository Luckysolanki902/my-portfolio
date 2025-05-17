import { useState } from 'react';

/**
 * Custom hook for handling form submissions
 * @param {Object} initialFormData - Initial form data state
 * @param {Function} submitCallback - Optional callback for actual form submission logic
 * @returns {Object} Form handling utilities
 */
export default function useFormSubmit(initialFormData, submitCallback = null) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ 
    success: false, 
    message: '' 
  });

  /**
   * Handle input changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    setFormData(initialFormData);
  };

  /**
   * Submit form data
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult({ success: false, message: '' });
    
    try {
      // If a submission callback is provided, use it
      if (submitCallback) {
        const result = await submitCallback(formData);
        setSubmitResult(result);
      } else {
        // Default "successful" simulation with delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitResult({
          success: true,
          message: "Message sent successfully! I'll get back to you soon."
        });
      }
      resetForm();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitResult({
        success: false,
        message: error.message || "Something went wrong. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    submitResult,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData
  };
}
