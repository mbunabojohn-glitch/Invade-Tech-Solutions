import { useNavigate, useParams } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import { useWebinarRoom } from "../../../hooks/useApi";

export function WebinarRoom() {
  const { webinarId } = useParams<{ webinarId: string }>();
  const navigate = useNavigate();
  const { data: roomData, isLoading, error } = useWebinarRoom(webinarId);
  const roomUrl = (roomData as any)?.data?.roomUrl || (roomData as any)?.roomUrl;

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-slate-950 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mb-4" />
        <p className="text-slate-300">Loading webinar room...</p>
      </div>
    );
  }

  if (error) {
    const errorMessage = (error as any)?.response?.data?.error || "An error occurred";
    return (
      <div className="w-screen h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <button
          onClick={() => navigate("/student/webinars")}
          className="absolute top-4 left-4 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Leave Classroom</span>
        </button>
        <p className="text-red-400 text-lg mb-2">{errorMessage}</p>
        <button
          onClick={() => navigate("/student/webinars")}
          className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
          Back to Webinars
        </button>
      </div>
    );
  }

  if (!roomUrl) {
    return (
      <div className="w-screen h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <button
          onClick={() => navigate("/student/webinars")}
          className="absolute top-4 left-4 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Leave Classroom</span>
        </button>
        <p className="text-slate-400 text-lg">This webinar has not started yet. Please wait.</p>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black flex flex-col">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate("/student/webinars")}
          className="px-3 py-2 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg text-white text-sm hover:bg-slate-800/80 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Leave Classroom
        </button>
      </div>
      <iframe
        src={roomUrl}
        allow="camera; microphone; fullscreen; speaker; display-capture"
        style={{ width: "100%", height: "100vh", border: "none" }}
        title="Webinar Room"
      />
    </div>
  );
}
