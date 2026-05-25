import { Video, Calendar, Clock, CheckCircle, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useStudentWebinars, useRegisterForWebinar, useWebinarRoom } from "../../../hooks/useApi";

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
  status: "scheduled" | "live" | "completed";
  isRegistered?: boolean;
}

const STATUS_STYLE: Record<string, string> = {
  scheduled: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
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

function WebinarRoomModal({
  webinarId,
  onClose,
}: {
  webinarId: string;
  onClose: () => void;
}) {
  const { data: roomData, isLoading, error } = useWebinarRoom(webinarId);
  const roomUrl = (roomData as any)?.data?.roomUrl || (roomData as any)?.roomUrl;

  if (error) {
    toast.error("Webinar is not live yet");
    onClose();
    return null;
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Joining webinar...</p>
        </div>
      </div>
    );
  }

  if (!roomUrl) {
    toast.error("Failed to get webinar room URL");
    onClose();
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <h2 className="text-white font-semibold">Webinar Room</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <iframe
        src={roomUrl}
        allow="camera; microphone; fullscreen; display-capture; autoplay"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Webinar Room"
      />
    </div>
  );
}

export function Webinars() {
  const [activeWebinarId, setActiveWebinarId] = useState<string | null>(null);
  const { data: response, isLoading: loading, error } = useStudentWebinars();
  const { mutateAsync: registerForWebinar, isPending: isRegistering } =
    useRegisterForWebinar({
      onSuccess: () => {
        toast.success("Successfully registered for webinar");
      },
      onError: (err: any) => {
        const errorMsg =
          err.response?.data?.error ||
          err.message ||
          "Failed to register for webinar";
        toast.error(errorMsg);
      },
    });

  const webinars = Array.isArray((response as any)?.data)
    ? (response as any).data
    : Array.isArray(response)
    ? response
    : [];

  const handleRegister = async (webinarId: string) => {
    await registerForWebinar(webinarId);
  };

  const handleJoin = (webinarId: string) => {
    setActiveWebinarId(webinarId);
  };

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
          {webinars.map((webinar: Webinar) => (
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

              <p className="text-sm text-gray-400 line-clamp-2">
                {webinar.description}
              </p>

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
                {webinar.status === "scheduled" && !webinar.isRegistered ? (
                  <button
                    onClick={() => handleRegister(webinar._id || webinar.id!)}
                    disabled={isRegistering}
                    className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 disabled:cursor-not-allowed text-gray-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isRegistering ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                ) : webinar.status === "scheduled" && webinar.isRegistered ? (
                  <button
                    disabled
                    className="w-full py-2.5 bg-slate-800 text-gray-400 font-semibold rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Registered ✓
                  </button>
                ) : webinar.status === "live" && webinar.isRegistered ? (
                  <button
                    onClick={() => handleJoin(webinar._id || webinar.id!)}
                    className="w-full py-2.5 bg-green-500 hover:bg-green-400 text-gray-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Join Now
                  </button>
                ) : webinar.status === "completed" ? (
                  <button
                    disabled
                    className="w-full py-2.5 bg-slate-800 text-gray-400 font-semibold rounded-lg cursor-not-allowed"
                  >
                    Ended
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-2.5 bg-slate-800 text-gray-400 font-semibold rounded-lg cursor-not-allowed"
                  >
                    Not available
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeWebinarId && (
        <WebinarRoomModal
          webinarId={activeWebinarId}
          onClose={() => setActiveWebinarId(null)}
        />
      )}
    </div>
  );
}
