import { Video, Calendar, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStudentWebinars } from "../../../hooks/useApi";

interface Webinar {
  _id: string;
  id?: string;
  title: string;
  description: string;
  host: string;
  instructor?: string;
  date: string;
  time: string;
  duration: string;
  status: "upcoming" | "live" | "completed";
  isRegistered?: boolean;
}

const STATUS_STYLE: Record<string, string> = {
  upcoming: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  live: "bg-green-500/10 text-green-400 border border-green-500/20",
  completed: "bg-gray-500/10 text-gray-400 border border-gray-500/20",
};

function SkeletonCard() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-slate-800 rounded-xl animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-slate-800 rounded w-2/3 animate-pulse"></div>
          <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
      <div className="h-4 bg-slate-800 rounded w-full animate-pulse"></div>
      <div className="flex gap-2">
        <div className="h-10 bg-slate-800 rounded-lg w-24 animate-pulse"></div>
      </div>
    </div>
  );
}

export function Webinars() {
  const navigate = useNavigate();
  const { data: response, isLoading: loading, error } = useStudentWebinars();

  const webinars = Array.isArray((response as any)?.data)
    ? (response as any).data
    : Array.isArray(response)
    ? response
    : [];

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Webinars</h2>
          <p className="text-gray-400 mt-1">
            Upcoming, live, and past webinar sessions.
          </p>
        </div>
        <div className="text-center py-16">
          <p className="text-red-400 mb-2">Failed to load webinars</p>
          <p className="text-gray-400">
            {(error as Error)?.message || "An unexpected error occurred"}
          </p>
        </div>
      </div>
    );
  }

  if (!loading && webinars.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Webinars</h2>
          <p className="text-gray-400 mt-1">
            Upcoming, live, and past webinar sessions.
          </p>
        </div>
        <div className="text-center py-16">
          <p className="text-gray-400">No webinars available yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Webinars</h2>
        <p className="text-gray-400 mt-1">
          Upcoming, live, and past webinar sessions.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {webinars.map((webinar: Webinar) => {
            console.log('Webinar status:', webinar.status);
            return (
            <div
              key={webinar._id || webinar.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      webinar.status === "live"
                        ? "bg-green-500/10"
                        : "bg-blue-500/10"
                    }`}
                  >
                    <Video
                      className={`w-6 h-6 ${
                        webinar.status === "live"
                          ? "text-green-400"
                          : "text-blue-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-base leading-tight">
                      {webinar.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {webinar.host || webinar.instructor}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize flex-shrink-0 ${
                    STATUS_STYLE[webinar.status]
                  }`}
                >
                  {webinar.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />{" "}
                  {new Date(webinar.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {webinar.time}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {webinar.duration}
                </span>
              </div>

              <div className="pt-2">
                {webinar.status === 'live' ? (
                  <button 
                    onClick={() => navigate(`/student/classroom/${webinar._id}`)}
                    className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg shadow-green-500/30 transition-all animate-pulse"
                  >
                    🔴 Join Now — Live
                  </button>
                ) : webinar.status === 'upcoming' ? (
                  <div className="w-full py-3 bg-blue-500/20 text-blue-400 font-semibold rounded-lg text-center border border-blue-500/30">
                    📅 Upcoming
                  </div>
                ) : (
                  <div className="w-full py-3 bg-gray-600/20 text-gray-400 font-semibold rounded-lg text-center border border-gray-600/30">
                    ✅ Completed
                  </div>
                )}
              </div>
            </div>
          );
          })}
        </div>
      )}
    </div>
  );
}
