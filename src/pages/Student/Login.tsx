import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight } from "lucide-react";

const StudentLogin = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-gray-900/95 p-10 shadow-2xl shadow-black/40">
        <div className="flex items-center gap-3 text-cyan-300 mb-6">
          <GraduationCap className="w-8 h-8" />
          <div>
            <h1 className="text-3xl font-semibold">Student Portal</h1>
            <p className="text-sm text-gray-400">
              Login, access your courses, and manage your registration.
            </p>
          </div>
        </div>

        <div className="space-y-6 text-gray-300">
          <p>
            This portal page is available for student login and course access.
            If you already have an account, sign in here once your login page is
            implemented.
          </p>
          <div className="rounded-2xl bg-gray-950/80 p-6 border border-cyan-500/20">
            <p className="text-lg font-medium text-white">
              Need to register first?
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Visit the registration page to sign up for an upcoming course and
              gain access to the student portal.
            </p>
            <Link
              to="/register"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-cyan-400"
            >
              Register Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
