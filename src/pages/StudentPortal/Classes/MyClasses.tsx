import {
  BookOpen,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStudentClasses } from "../../../hooks/useApi";

interface CourseClass {
  _id: string;
  title: string;
  instructor: string;
  schedule: string;
  duration: string;
  enrolled: number;
  capacity: number;
  progress: number;
  status: "active" | "completed" | "upcoming";
  startDate: string;
}

// Removed unused MOCK_CLASSES

const STATUS_STYLE = {
  active: "bg-green-500/10 text-green-400 border border-green-500/20",
  completed: "bg-gray-500/10 text-gray-400 border border-gray-500/20",
  upcoming: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
};

function PageLoader({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mx-auto mb-3" />
        <p className="text-gray-400">{text}</p>
      </div>
    </div>
  );
}

export function MyClasses() {
  const navigate = useNavigate();
  const { data: response, isLoading: loading } = useStudentClasses();
  const classes = ((response as { data?: CourseClass[] })?.data as CourseClass[]) || [];

  if (loading) return <PageLoader text="Loading your classes..." />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">My Classes</h2>
        <p className="text-gray-400 mt-1">
          Your enrolled courses and progress.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-white text-base leading-tight">
                  {cls.title}
                </h3>
                <p className="text-sm text-gray-400 mt-0.5">{cls.instructor}</p>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize flex-shrink-0 ${STATUS_STYLE[cls.status]}`}
              >
                {cls.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {cls.schedule}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> {cls.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {cls.enrolled}/{cls.capacity}{" "}
                enrolled
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-400">Progress</span>
                <span className="text-xs font-semibold text-cyan-400">
                  {cls.progress}%
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    cls.status === "completed" ? "bg-green-500" : "bg-cyan-500"
                  }`}
                  style={{ width: `${cls.progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => navigate("/student/classroom")}
              className={`w-full py-3 sm:py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                cls.status === "completed"
                  ? "bg-slate-800 hover:bg-slate-700 text-gray-300"
                  : "bg-cyan-500 hover:bg-cyan-400 text-gray-950"
              }`}
            >
              {cls.status === "completed" ? (
                <>
                  <CheckCircle className="w-4 h-4" /> View Certificate
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" /> Continue Class
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
