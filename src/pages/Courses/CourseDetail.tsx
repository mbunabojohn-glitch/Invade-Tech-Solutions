import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Loader2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useCourse, useApplyForCourse } from "../../hooks/useApi";
import { useAppStore } from "../../store/useAppStore";
import { type CourseModule } from "../../lib/api";

const FORMAT_OPTIONS = [
  { value: "live", label: "Live (in-person)" },
  { value: "virtual", label: "Virtual (online)" },
  { value: "self-paced", label: "Self-paced" },
];

// Fixed final modules appended to every course curriculum (frontend only).
const FINAL_MODULES: CourseModule[] = [
  {
    title: "Exams",
    topics: ["Written and practical assessment", "Project evaluation"],
  },
  {
    title: "Certification",
    topics: ["Certificate of completion", "Verification of your certificate"],
  },
];

// Capitalises only the first letter of a string and leaves the rest untouched,
// so acronyms like "SQL", "CI/CD", "AI", and "UX" stay unchanged.
const capitalise = (text: string) =>
  text ? text.charAt(0).toUpperCase() + text.slice(1) : text;

/**
 * CourseDetail Page
 * Shows a single course's details and handles the apply flow:
 * - Not logged in: sends the student to /student/login and back to this page.
 * - Logged in: reveals a small application form.
 */
const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isStudentAuthenticated = useAppStore((s) => s.isStudentAuthenticated);

  const { data: course, isLoading, isError } = useCourse(slug);
  const applyMutation = useApplyForCourse();

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [preferredFormat, setPreferredFormat] = useState("live");
  const [message, setMessage] = useState("");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll animation setup (same pattern as Home/Services)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" },
    );

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [course, isLoading]);

  const handleApplyClick = () => {
    if (!isStudentAuthenticated) {
      navigate("/student/login", { state: { from: `/courses/${slug}` } });
      return;
    }
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) return;

    try {
      await applyMutation.mutateAsync({
        slug,
        data: {
          preferredFormat,
          message: message.trim() || undefined,
        },
      });
      setSubmitted(true);
      toast.success("Your application has been submitted.");
    } catch (err) {
      const error = err as AxiosError<{ error?: string; message?: string }>;
      if (error.response?.status === 409) {
        toast.error("You have already applied for this course.");
      } else {
        const errorMsg =
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.";
        toast.error(errorMsg);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 pt-32">
        <div className="max-w-4xl mx-auto px-4 animate-pulse">
          <div className="h-4 bg-gray-900 rounded w-24 mb-6" />
          <div className="h-12 bg-gray-900 rounded w-2/3 mb-8" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-900 rounded w-full" />
            <div className="h-4 bg-gray-900 rounded w-full" />
            <div className="h-4 bg-gray-900 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="min-h-screen bg-gray-950 pt-32">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-2xl font-semibold text-white mb-8">
            This course could not be found.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center text-cyan-500 font-semibold hover:text-cyan-400"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const tuition =
    typeof course.tuition === "string" ? course.tuition.trim() : course.tuition;

  // Curriculum from the API with the fixed Exams and Certification modules
  // appended. These are always shown, even when the API returns no curriculum.
  const curriculum = [...(course.curriculum || []), ...FINAL_MODULES];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pb-20 overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 via-slate-900 to-cyan-950 animate-gradient-slow">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            to="/courses"
            className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors mb-8 text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>

          {course.school && (
            <span className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium scroll-animate fade-in">
              <GraduationCap className="w-4 h-4" />
              {course.school}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight scroll-animate fade-in">
            {course.title}
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed scroll-animate fade-in">
            {capitalise(course.summary)}
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        {/* Tuition */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 mb-10 scroll-animate fade-in">
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
            Tuition
          </p>
          <p className="text-2xl font-bold text-white">
            {tuition ? tuition : "Contact us for fees"}
          </p>
        </div>

        {/* Highlights */}
        {course.highlights && course.highlights.length > 0 && (
          <section className="mb-12 scroll-animate fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">
              What You'll <span className="text-cyan-500">Gain</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{capitalise(highlight)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Curriculum */}
        <section className="mb-12 scroll-animate fade-in">
          <h2 className="text-2xl font-bold text-white mb-6">
            Course <span className="text-cyan-500">Curriculum</span>
          </h2>
          <div className="space-y-4">
            {curriculum.map((module, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {capitalise(module.title)}
                </h3>
                <ul className="space-y-2">
                  {(module.topics || []).map((topic, tIndex) => (
                    <li
                      key={tIndex}
                      className="flex items-start gap-3 text-gray-400"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                      <span>{capitalise(topic)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Apply Section */}
        <section className="rounded-2xl border border-cyan-500/20 bg-gray-900 p-8 scroll-animate fade-in">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Ready to Apply?</h2>
          </div>

          {submitted ? (
            <div className="flex items-start gap-3 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
              <CheckCircle className="w-6 h-6 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold">
                  Your application has been received.
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  We will contact you shortly with the next steps.
                </p>
              </div>
            </div>
          ) : !showForm ? (
            <>
              <p className="text-gray-400 mb-6">
                {isStudentAuthenticated
                  ? "Submit a short application to reserve your place."
                  : "Sign in to your student account to apply for this course."}
              </p>
              <button
                onClick={handleApplyClick}
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <span>Apply</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Preferred Format
                </label>
                <select
                  value={preferredFormat}
                  onChange={(e) => setPreferredFormat(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-800 bg-gray-950 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                >
                  {FORMAT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Message <span className="text-gray-500">(optional)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Tell us anything that helps us prepare for you."
                  className="w-full px-4 py-3 rounded-lg border border-gray-800 bg-gray-950 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={applyMutation.isPending}
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                {applyMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
};

export default CourseDetail;
