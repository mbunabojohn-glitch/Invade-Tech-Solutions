import { Video, Calendar, Clock, Play } from "lucide-react";
import { useStudentWebinars } from "../../../hooks/useApi";

interface Webinar {
  _id: string;
  id?: string;
  title: string;
  className?: string;
  host: string;
  instructor?: string;
  date: string;
  time: string;
  duration: string;
  status: "upcoming" | "live" | "completed";
  recordingUrl?: string;
  videoUrl?: string;
  url?: string;
  dailyRoomUrl?: string;
  [key: string]: any;
}

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
        <div className="h-10 bg-slate-800 rounded-lg w-full animate-pulse"></div>
      </div>
    </div>
  );
}

export function Recordings() {
  const { data: response, isLoading: loading, error } = useStudentWebinars();

  const webinars = Array.isArray((response as any)?.data)
    ? (response as any).data
    : Array.isArray(response)
    ? response
    : [];

  console.log('Fetched webinars:', webinars);

  // Filter only completed webinars
  const completedWebinars = webinars.filter(
    (webinar: Webinar) => webinar.status === "completed"
  );

  console.log('Completed webinars:', completedWebinars);

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">My Recordings</h2>
          <p className="text-gray-400 mt-1">Rewatch your class sessions</p>
        </div>
        <div className="text-center py-16">
          <p className="text-red-400 mb-2">Failed to load recordings</p>
          <p className="text-gray-400">
            {(error as Error)?.message || "An unexpected error occurred"}
          </p>
        </div>
      </div>
    );
  }

  if (!loading && completedWebinars.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">My Recordings</h2>
          <p className="text-gray-400 mt-1">Rewatch your class sessions</p>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Video className="w-16 h-16 text-slate-700 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No recordings yet</h3>
          <p className="text-gray-400">Check back after your classes!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">My Recordings</h2>
        <p className="text-gray-400 mt-1">Rewatch your class sessions</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {completedWebinars.map((webinar: Webinar) => (
            <div
              key={webinar._id || webinar.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                    <Video className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-base leading-tight">
                      {webinar.title}
                    </h3>
                    {webinar.className && (
                      <p className="text-sm text-gray-500 mt-1">
                        {webinar.className}
                      </p>
                    )}
                    <p className="text-sm text-gray-400 mt-1">
                      {webinar.host || webinar.instructor}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize bg-gray-500/10 text-gray-400 border border-gray-500/20">
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
                <button 
                  onClick={(e) => {
                    console.log('Webinar clicked:', webinar);
                    e.preventDefault();
                  }}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-gray-950 font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Play className="w-4 h-4" /> Watch Recording
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
