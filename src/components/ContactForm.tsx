import { useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { Send, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useSubmitContactForm } from "../hooks/useApi";
import { serviceCategories } from "../data/servicesData";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm = () => {
  // useLocation allows us to access the state passed during navigation
  // For instance, when coming from the Career page, state might hold { service, jobTitle, message }
  const location = useLocation();
  const state = location.state as {
    service?: string;
    jobTitle?: string;
    message?: string;
  } | null;

  // Initialize the form state. We pre-fill fields if any data exists in the navigation state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: state?.service || "general", // Pre-fill service category if available
    // Pre-fill message body if available, otherwise check for a jobTitle to generate a custom application message
    message: state?.message || (state?.jobTitle ? `I would like to apply for the ${state.jobTitle} position.` : ""),
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Use the custom React Query mutation to handle form submission gracefully
  const { mutateAsync: submitForm, isPending } = useSubmitContactForm();

  // Validation function checks required fields before submitting
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation using a standard regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (optional, but validates format if a number is provided)
    if (formData.phone && !/^[-+\d\s()]*$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors were found
  };

  // Handle generic input changes for text, textarea, and select fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error for this specific field once the user starts typing to improve UX
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle the form submission event
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default browser form submission (page reload)

    // Run validation and stop execution if there are errors
    if (!validateForm()) {
      return;
    }

    const loadingToast = toast.loading("Sending your message...");

    try {
      await submitForm(formData);
      toast.dismiss(loadingToast);
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
        duration: 5000,
      });

      // Reset form to blank/default state after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "general",
        message: "",
      });
      setErrors({});
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error("Failed to send message", {
        description: error?.message || "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="bg-gray-950 rounded-lg p-8 border border-gray-800 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-900 border ${
              errors.name ? "border-red-500" : "border-gray-700"
            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300`}
            placeholder="John Doe"
            disabled={isPending}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-900 border ${
              errors.email ? "border-red-500" : "border-gray-700"
            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300`}
            placeholder="john.doe@example.com"
            disabled={isPending}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Input */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-900 border ${
              errors.phone ? "border-red-500" : "border-gray-700"
            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300`}
            placeholder="+234 123 456 7890"
            disabled={isPending}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Company Input */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            placeholder="Your Company"
            disabled={isPending}
          />
        </div>

        {/* Service Select - Updated with actual services */}
        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            disabled={isPending}
          >
            <option value="general">General Inquiry</option>
            {serviceCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
            <option value="Partnership Opportunity">
              Partnership Opportunity
            </option>
            <option value="career-application">Career Application</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message Textarea */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-3 bg-gray-900 border ${
              errors.message ? "border-red-500" : "border-gray-700"
            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none`}
            placeholder="Tell us about your project or how we can help..."
            disabled={isPending}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-400 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/50 disabled:hover:shadow-none"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </button>

        <p className="text-sm text-gray-400 text-center">
          We respect your privacy. Your information will never be shared.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
