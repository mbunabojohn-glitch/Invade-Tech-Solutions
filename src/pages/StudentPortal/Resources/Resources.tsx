import { useState } from "react";
import {
  FileText,
  Film,
  Image,
  Music,
  Download,
  Search as SearchIcon,
  Loader2,
} from "lucide-react";
import { useStudentResources } from "../../../hooks/useApi";

interface Resource {
  _id: string;
  title: string;
  description: string;
  fileType: "pdf" | "video" | "image" | "audio" | string;
  fileSize?: number;
  createdAt: string;
  fileUrl: string;
}

const FILE_ICON: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-5 h-5 text-red-400" />,
  video: <Film className="w-5 h-5 text-blue-400" />,
  image: <Image className="w-5 h-5 text-green-400" />,
  audio: <Music className="w-5 h-5 text-purple-400" />,
};

const FILE_BADGE: Record<string, string> = {
  pdf: "bg-red-500/10 text-red-400",
  video: "bg-blue-500/10 text-blue-400",
  image: "bg-green-500/10 text-green-400",
  audio: "bg-purple-500/10 text-purple-400",
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

export function Resources() {
  const { data: response, isLoading: loading } = useStudentResources();
  const resources = ((response as { data?: Resource[] })?.data as Resource[]) || [];
  const [search, setSearch] = useState("");

  const filtered = resources.filter((r) => {
    const q = search.toLowerCase();
    return (
      !q ||
      r.title.toLowerCase().includes(q) ||
      (r.description && r.description.toLowerCase().includes(q))
    );
  });

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatFileSize = (size?: number) => {
    if (!size) return "";
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  };

  if (loading) return <PageLoader text="Loading resources..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Resources</h2>
          <p className="text-gray-400 mt-1">
            Course materials, lecture notes, and recordings.
          </p>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
          />
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 divide-y divide-slate-800">
        {filtered.length === 0 ? (
          <div className="text-center py-14">
            <FileText className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">
              {search
                ? "No resources match your search."
                : "No resources uploaded yet."}
            </p>
          </div>
        ) : (
          filtered.map((res, i) => (
            <div
              key={res._id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-5 py-4 hover:bg-slate-800/40 transition-colors ${
                i % 2 === 0 ? "" : "bg-slate-800/20"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  {FILE_ICON[res.fileType] || <FileText className="w-5 h-5 text-gray-400" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {res.title}
                  </p>
                  {res.description && (
                    <p className="text-xs text-gray-500 truncate">{res.description}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4 flex-shrink-0 w-full sm:w-auto">
                <span
                  className={`hidden sm:block px-2 py-0.5 rounded text-xs font-semibold uppercase ${FILE_BADGE[res.fileType] || "bg-gray-500/10 text-gray-400"}`}
                >
                  {res.fileType}
                </span>
                {res.fileSize && (
                  <span className="hidden md:block text-xs text-gray-500">
                    {formatFileSize(res.fileSize)}
                  </span>
                )}
                <span className="hidden md:block text-xs text-gray-500">
                  {formatDate(res.createdAt)}
                </span>
                <a
                  href={res.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 text-xs font-semibold rounded-lg transition-colors flex-grow sm:flex-grow-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
