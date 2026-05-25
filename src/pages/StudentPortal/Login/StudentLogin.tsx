import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppStore } from "../../../store/useAppStore";
import { useStudentLogin } from "../../../hooks/useApi";
import {
  Mail,
  Lock,
  GraduationCap,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  BookOpen,
  Users,
  Award,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

// ─── Feature Highlights ───────────────────────────────────────────────────────
const PORTAL_FEATURES = [
  {
    icon: BookOpen,
    title: "Access Your Classes",
    desc: "View enrolled courses, schedules and learning materials.",
  },
  {
    icon: Users,
    title: "Join Live Webinars",
    desc: "Attend instructor-led sessions and interactive workshops.",
  },
  {
    icon: Award,
    title: "Track Your Progress",
    desc: "Monitor completion rates and download certificates.",
  },
];

export default function StudentLogin() {
  const navigate = useNavigate();
  const setStudentToken = useAppStore((state) => state.setStudentToken);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: loginStudent, isPending: isSubmitting } =
    useStudentLogin();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const dataToSend = {
        email: formData.email.trim(),
        password: formData.password.trim(),
      };
      const response = (await loginStudent(dataToSend)) as any;

      // Check for success flag in the response body
      if (response?.success === false) {
        throw new Error(response?.error || "Invalid email or password.");
      }

      // Backend typically returns { success: true, data: { token, student } }
      // We look for token and student in response.data or response itself
      console.log("Login response from backend:", response);
      const token = response?.data?.token || response?.token;
      const student = response?.data?.student || response?.student;

      console.log("Extracted token:", token);
      console.log("Extracted student:", student);

      if (token && student) {
        setStudentToken(token, student);
        toast.success("Welcome back! Redirecting to your dashboard...");
        setTimeout(() => navigate("/student/dashboard"), 800);
      } else {
        console.error("Login response missing credentials:", response);
        throw new Error("Invalid response from server: Missing token or student data");
      }
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error ||
        err.message ||
        "Invalid email or password.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="hidden lg:flex flex-col justify-center px-16 w-[45%] relative z-10">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">
                Invade Tech
              </p>
              <p className="text-cyan-400 text-sm">Student Portal</p>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Learn. Grow.
            <br />
            <span className="text-cyan-400">Succeed.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Your personal learning hub for IT training, live webinars, and
            hands-on classroom sessions.
          </p>
        </div>

        <div className="space-y-4">
          {PORTAL_FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl"
            >
              <div className="w-9 h-9 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{title}</p>
                <p className="text-gray-500 text-sm mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-600 text-sm">
            Not a student yet?{" "}
            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Register for a course →
            </Link>
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-20 relative z-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Student Portal
            </h1>
            <p className="text-gray-400">Sign in to access your courses</p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <div className="hidden lg:block mb-6">
              <h2 className="text-2xl font-bold text-white">Welcome back</h2>
              <p className="text-gray-400 text-sm mt-1">
                Sign in to your student account
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
                    autoComplete="email"
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

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-300">
                    Password <span className="text-cyan-400">*</span>
                  </label>
                  <Link
                    to="/student/forgot-password"
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`w-full pl-10 pr-12 py-3 bg-slate-800 border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${
                      errors.password
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-slate-700 focus:border-cyan-500/50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 disabled:cursor-not-allowed text-gray-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2 text-base shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In to Portal
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-gray-600 text-xs">
                Don't have an account?
              </span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            <Link
              to="/register"
              className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium rounded-lg transition-all text-sm"
            >
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              Register for a Course
            </Link>

            <p className="text-center text-xs text-gray-600 mt-4">
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-400 transition-colors underline underline-offset-2"
              >
                ← Back to Invade Tech Solution
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
