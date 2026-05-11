// ─────────────────────────────────────────────────────────────────────────────
// src/pages/Register/Register.tsx
//
// Public-facing student registration page.
// Matches Invade Tech Solution branding: dark navy/slate + cyan/blue accents.
// Follows the same form pattern as ContactForm.tsx — validation, toast
// notifications (Sonner), and React Query mutation via useStudentRegister().
//
// Route: /register
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useStudentRegister } from "../../hooks/useApi";
import { useAppStore } from "../../store/useAppStore";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  MessageSquare,
  GraduationCap,
  ArrowRight,
  ChevronDown,
  Loader2,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface RegistrationFormData {
  fullName: string;
  email: string;
  password?: string;
  phone: string;
  course: string;
  educationalBackground: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  course?: string;
  educationalBackground?: string;
  message?: string;
}

// ─── Available Courses ────────────────────────────────────────────────────────
// Update this list to match your actual course/webinar offerings
const COURSES = [
  "IT Support & Hardware Maintenance",
  "Cloud Infrastructure Fundamentals",
  "Network Administration",
  "Cybersecurity Essentials",
  "Project Management in IT",
  "Web Development Bootcamp",
  "IT Outsourcing & Consulting",
  "Hardware Procurement & Management",
];

const EDUCATION_LEVELS = [
  "Secondary School (SSCE/WAEC)",
  "OND / NCE",
  "HND / B.Sc",
  "Postgraduate (M.Sc / MBA)",
  "Professional Certification",
  "No Formal IT Background",
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Register() {
  const navigate = useNavigate();
  const setStudentToken = useAppStore((s) => s.setStudentToken);

  // ── Form state ──────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    course: "",
    educationalBackground: "",
    message: "",
  });

  // ── Validation errors ───────────────────────────────────────────────────────
  const [errors, setErrors] = useState<FormErrors>({});

  // ── Password visibility ───────────────────────────────────────────────────
  const [showPassword, setShowPassword] = useState(false);

  // ── Submission state ────────────────────────────────────────────────────────
  const { mutateAsync: registerStudent, isPending: isSubmitting } =
    useStudentRegister();
  const [isSuccess, setIsSuccess] = useState(false);

  // ─── Validation ──────────────────────────────────────────────────────────────
  // Client-side validation mirrors the pattern in ContactForm.tsx
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    const phoneRegex = /^[\d\s\-+()]{7,15}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.course) {
      newErrors.course = "Please select a course or webinar.";
    }

    if (!formData.educationalBackground) {
      newErrors.educationalBackground =
        "Please select your educational background.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Input Change Handler ─────────────────────────────────────────────────
  // Clears the error for a field as soon as the user starts typing (better UX)
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ─── Form Submit ──────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Filter out extra fields and trim strings
      const dataToSend = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password?.trim(),
        phone: formData.phone.trim(),
        course: formData.course,
      };

      const response = (await registerStudent(dataToSend)) as any;

      // Check for success flag if the backend returns it in a 200/201 response
      if (response.success === false) {
        throw new Error(response.error || "Registration failed");
      }

      // The backend returns { success: true, data: { token, student }, message }
      const authData = response.data || response;

      // Handle successful registration and auto-login if token is returned
      if (authData.token && authData.student) {
        setStudentToken(authData.token, authData.student);
      }

      setIsSuccess(true);
      toast.success(
        "Registration successful! Welcome to Invade Tech Solution.",
      );
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error ||
        err.message ||
        "Registration failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  // ─── Success Screen ───────────────────────────────────────────────────────
  // Shown after a successful submission — replaces the form
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-20">
        {/* Subtle grid background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 text-center max-w-md mx-auto">
          {/* Animated checkmark */}
          <div className="w-20 h-20 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle2 className="w-10 h-10 text-cyan-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Registration Successful!
          </h2>
          <p className="text-gray-400 mb-2">
            Welcome to Invade Tech Solution's learning platform.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            A confirmation email has been sent to{" "}
            <span className="text-cyan-400 font-medium">{formData.email}</span>.
            Please check your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* Navigate to student login once it's built */}
            <button
              onClick={() => navigate("/student/login")}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold rounded-lg transition-colors"
            >
              Go to Student Portal
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main Registration Form ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* ── Background: subtle circuit-board grid (matches your hero section) ── */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Cyan glow blob — top left */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      {/* Blue glow blob — bottom right */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── Registration Card ─────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Card header */}
        <div className="text-center mb-8">
          {/* Icon badge */}
          <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Register for a Course
          </h1>
          <p className="text-gray-400">
            Join Invade Tech Solution's learning platform and grow your IT
            career.
          </p>
          {/* Already have an account link */}
          <p className="text-sm text-gray-500 mt-2">
            Already registered?{" "}
            <Link
              to="/student/login"
              className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-4 transition-colors"
            >
              Login to Student Portal
            </Link>
          </p>
        </div>

        {/* Form card */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* ── Row 1: Full Name ────────────────────────────────────────── */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Full Name <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Chukwuemeka Obi"
                  className={`w-full pl-10 pr-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${
                    errors.fullName
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-slate-700 focus:border-cyan-500/50"
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1.5">{errors.fullName}</p>
              )}
            </div>

            {/* ── Row 2: Email + Phone (side by side on md+) ──────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email Address <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${
                      errors.email
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-slate-700 focus:border-cyan-500/50"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Password <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password (min 6 characters)"
                    className={`w-full pl-10 pr-12 py-3 bg-slate-800 border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${
                      errors.password
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-slate-700 focus:border-cyan-500/50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Phone Number <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 800 000 0000"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${
                      errors.phone
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-slate-700 focus:border-cyan-500/50"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* ── Row 3: Course Selection ─────────────────────────────────── */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Course / Webinar <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-3 bg-slate-800 border rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${
                    errors.course
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-slate-700 focus:border-cyan-500/50"
                  } ${!formData.course ? "text-gray-600" : "text-white"}`}
                >
                  <option value="" disabled>
                    Select a course or webinar
                  </option>
                  {COURSES.map((course) => (
                    <option
                      key={course}
                      value={course}
                      className="bg-slate-800 text-white"
                    >
                      {course}
                    </option>
                  ))}
                </select>
              </div>
              {errors.course && (
                <p className="text-red-400 text-xs mt-1.5">{errors.course}</p>
              )}
            </div>

            {/* ── Row 4: Educational Background ──────────────────────────── */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Educational Background <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                <select
                  name="educationalBackground"
                  value={formData.educationalBackground}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-3 bg-slate-800 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${
                    errors.educationalBackground
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-slate-700 focus:border-cyan-500/50"
                  } ${!formData.educationalBackground ? "text-gray-600" : "text-white"}`}
                >
                  <option value="" disabled>
                    Select your education level
                  </option>
                  {EDUCATION_LEVELS.map((level) => (
                    <option
                      key={level}
                      value={level}
                      className="bg-slate-800 text-white"
                    >
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              {errors.educationalBackground && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.educationalBackground}
                </p>
              )}
            </div>

            {/* ── Row 5: Message / Questions (optional) ──────────────────── */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Message or Questions{" "}
                <span className="text-gray-600 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any questions about the course, schedule, or requirements?"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
                />
              </div>
            </div>

            {/* ── Submit Button ───────────────────────────────────────────── */}
            {/* Disabled + spinner while submitting */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 disabled:cursor-not-allowed text-gray-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2 text-base shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting Registration...
                </>
              ) : (
                <>
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* ── Footer note ─────────────────────────────────────────────── */}
            <p className="text-center text-xs text-gray-600 pt-1">
              By registering, you agree to our{" "}
              <Link
                to="/terms-of-service"
                className="text-gray-500 hover:text-gray-400 underline underline-offset-2"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                className="text-gray-500 hover:text-gray-400 underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
