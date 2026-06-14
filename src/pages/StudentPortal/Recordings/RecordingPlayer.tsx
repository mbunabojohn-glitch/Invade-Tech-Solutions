import { useParams, useNavigate } from 'react-router-dom';
import { useWebinarRecording } from '../../../hooks/useApi';
import { useAppStore } from '../../../store/useAppStore';

interface Recording {
  _id: string;
  title: string;
  description: string;
  host: string;
  date: string;
  time: string;
  duration: string;
  status: string;
  dailyRoomUrl: string;
  dailyRoomName: string;
  recordingUrl?: string;
}

export default function RecordingPlayer() {
  const { recordingId } = useParams<{ recordingId: string }>();
  const navigate = useNavigate();
  const { setError, clearError } = useAppStore();

  // Fetch recording data using TanStack Query hook
  const { data: response, isLoading: loading, error } = useWebinarRecording(recordingId);

  // Extract recording from response
  const recording = response as unknown as Recording;
  console.log("Recording URL:", recording.recordingUrl);

  // Handle errors
  if (error) {
    setError('Failed to load recording. Please try again.');
  }

  const handleGoBack = () => {
    clearError();
    navigate('/student/recordings');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
          <p className="text-gray-300">Loading recording...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !recording) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-red-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-400 mb-2 text-lg font-semibold">
            {error ? 'Error loading recording' : 'Recording not found'}
          </p>
          <p className="text-gray-400 mb-6">
            {error?.message || 'The recording you are looking for does not exist.'}
          </p>
          <button
            onClick={handleGoBack}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-2 px-6 rounded-lg transition"
          >
            Back to Recordings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Recordings
        </button>

        {/* Video Player Section */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-2xl mb-8 border border-slate-700">
          {/* Video Container */}
          <div className="aspect-video bg-black flex items-center justify-center">
            {recording.recordingUrl ? (
              <iframe
                src={recording.recordingUrl}
                className="w-full h-full border-0"
                allow="camera; microphone; display-capture"
                allowFullScreen
              />
            ) : (
              <div className="text-center">
                <svg
                  className="w-16 h-16 text-gray-600 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-400">
                  Recording URL is being processed
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Please check back in a moment or contact your instructor
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recording Details */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700">
          {/* Title */}
          <h1 className="text-4xl font-bold text-white mb-2">{recording.title}</h1>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 pt-6 border-t border-slate-700">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Instructor</p>
              <p className="text-white font-semibold">{recording.host}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Date</p>
              <p className="text-white font-semibold">
                {formatDate(recording.date)}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Time</p>
              <p className="text-white font-semibold">{recording.time}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Duration</p>
              <p className="text-white font-semibold">{recording.duration} min</p>
            </div>
          </div>

          {/* Description */}
          {recording.description && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {recording.description}
              </p>
            </div>
          )}

          {/* Recording Status */}
          <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-gray-300">
                Status:{' '}
                <span className="text-green-400 font-semibold capitalize">
                  {recording.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
