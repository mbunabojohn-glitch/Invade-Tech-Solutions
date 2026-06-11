import {
  BookOpen,
  Clock,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMyClasses } from "../../../hooks/useApi";

interface CourseClass {
  _id: string;
  id?: string;
  title: string;
  batch: string;
  instructorName: string;
  instructor?: string;
  scheduleDays: string;
  scheduleTime: string;
  schedule?: string;
  startDate: string;
  endDate: string;
  duration: string;
  status: "active" | "completed" | "upcoming";
  enrolledStudents: number;
  enrolled?: number;
}

const STATUS_STYLE = {
  active: "bg-green-500/10 text-green-400 border border-green-500/20",
  completed: "bg-gray-500/10 text-gray-400 border border-gray-500/20",
  upcoming: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
};

function SkeletonCard() {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="h-5 bg-slate-800 rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-slate-800 rounded w-32 animate-pulse"></div>
        </div>
        <div className="h-6 bg-slate-800 rounded-full w-20 animate-pulse"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-800 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-slate-800 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-slate-800 rounded w-4/6 animate-pulse"></div>
      </div>
      <div className="h-10 bg-slate-800 rounded-lg animate-pulse"></div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <BookOpen className="w-16 h-16 text-slate-700 mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">You are not enrolled in any classes yet</h3>
      <p className="text-gray-400">Browse available courses to get started</p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-red-500 mb-4">
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Failed to load classes</h3>
      <p className="text-gray-400">{message}</p>
    </div>
  );
}

export function MyClasses() {
  const navigate = useNavigate();
  const { data: response, isLoading, error } = useMyClasses();
  const classes = Array.isArray(response?.data) 
    ? response.data 
    : (Array.isArray(response) ? response : []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">My Classes</h2>
          <p className="text-gray-400 mt-1">
            Your enrolled courses and progress.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">My Classes</h2>
          <p className="text-gray-400 mt-1">
            Your enrolled courses and progress.
          </p>
        </div>
        <ErrorState message={(error as Error)?.message || "An unexpected error occurred"} />
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">My Classes</h2>
          <p className="text-gray-400 mt-1">
            Your enrolled courses and progress.
          </p>
        </div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">My Classes</h2>
        <p className="text-gray-400 mt-1">
          Your enrolled courses and progress.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5">
        {classes.map((cls: CourseClass) => (
          <div
            key={cls._id || cls.id}
            className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-white text-base leading-tight">
                  {cls.title} {cls.batch && <span className="text-cyan-400">- {cls.batch}</span>}
                </h3>
                <p className="text-sm text-gray-400 mt-0.5">
                  {cls.instructorName || cls.instructor}
                </p>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize flex-shrink-0 ${STATUS_STYLE[cls.status]}`}
              >
                {cls.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {cls.scheduleDays || "Days TBA"} • {cls.scheduleTime || cls.schedule || "Time TBA"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {new Date(cls.startDate).toLocaleDateString()} - {new Date(cls.endDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {cls.duration}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {cls.enrolledStudents || cls.enrolled || 0} enrolled
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/student/classroom/${cls._id || cls.id}`)}
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
