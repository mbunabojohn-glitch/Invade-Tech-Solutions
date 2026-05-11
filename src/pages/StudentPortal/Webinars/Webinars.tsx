import { Video, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStudentWebinars } from "../../../hooks/useApi";

interface Webinar {
  _id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  status: "upcoming" | "live" | "ended";
  attendees: number;
}

// Removed unused MOCK_WEBINARS

const WEBINAR_STATUS: Record<string, string> = {
  live: "bg-red-500/10 text-red-400 border border-red-500/30",
  upcoming: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  ended: "bg-gray-500/10 text-gray-400 border border-gray-500/20",
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

export function Webinars() {
  const navigate = useNavigate();
  const { data: response, isLoading: loading } = useStudentWebinars();
  const webinars = ((response as { data?: Webinar[] })?.data as Webinar[]) || [];

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  if (loading) return <PageLoader text="Loading webinars..." />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Webinars</h2>
        <p className="text-gray-400 mt-1">
          Upcoming, live, and past webinar sessions.
        </p>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 divide-y divide-slate-800">
        {webinars.map((w) => (
          <div
            key={w._id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 relative ${
                  w.status === "live" ? "bg-red-500/10" : "bg-blue-500/10"
                }`}
              >
                <Video
                  className={`w-5 h-5 ${
                    w.status === "live" ? "text-red-400" : "text-blue-400"
                  }`}
                />
                {w.status === "live" && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <p className="font-semibold text-white text-sm">{w.title}</p>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${WEBINAR_STATUS[w.status]}`}
                  >
                    {w.status === "live" ? "🔴 Live" : w.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {w.instructor} · {formatDate(w.date)} at {w.time} ·{" "}
                  {w.duration}
                  {w.status === "ended" && ` · ${w.attendees} attended`}
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 w-full sm:w-auto">
              {w.status === "ended" ? (
                <button className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 text-sm font-medium rounded-lg transition-colors">
                  Watch Recording
                </button>
              ) : (
                <button
                  onClick={() => navigate("/student/classroom")}
                  className={`w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-2 text-sm font-bold rounded-lg flex items-center justify-center sm:justify-start gap-1.5 transition-colors ${
                    w.status === "live"
                      ? "bg-red-500 hover:bg-red-400 text-white"
                      : "bg-cyan-500 hover:bg-cyan-400 text-gray-950"
                  }`}
                >
                  {w.status === "live" ? "Join Now" : "Register"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
