import { useState } from "react";
import {
  FileText,
  Film,
  Download,
  Search as SearchIcon,
  Loader2,
} from "lucide-react";
import { useStudentResources } from "../../../hooks/useApi";

interface Resource {
  _id: string;
  name: string;
  type: "pdf" | "video" | "doc";
  size: string;
  course: string;
  uploadDate: string;
  downloadUrl: string;
}

const MOCK_RESOURCES: Resource[] = [
  {
    _id: "1",
    name: "IT Support — Week 1 Notes.pdf",
    type: "pdf",
    size: "2.4 MB",
    course: "IT Support & Hardware Maintenance",
    uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    downloadUrl: "#",
  },
  {
    _id: "2",
    name: "Hardware Diagnostics Lab Guide.pdf",
    type: "pdf",
    size: "1.8 MB",
    course: "IT Support & Hardware Maintenance",
    uploadDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    downloadUrl: "#",
  },
  {
    _id: "3",
    name: "Cloud Intro — Video Lecture.mp4",
    type: "video",
    size: "145 MB",
    course: "Cloud Infrastructure Fundamentals",
    uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    downloadUrl: "#",
  },
  {
    _id: "4",
    name: "AWS Core Services Overview.pdf",
    type: "pdf",
    size: "3.1 MB",
    course: "Cloud Infrastructure Fundamentals",
    uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    downloadUrl: "#",
  },
  {
    _id: "5",
    name: "Cybersecurity Glossary.doc",
    type: "doc",
    size: "0.9 MB",
    course: "Cybersecurity Essentials",
    uploadDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    downloadUrl: "#",
  },
];

const FILE_ICON: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-5 h-5 text-red-400" />,
  video: <Film className="w-5 h-5 text-blue-400" />,
  doc: <FileText className="w-5 h-5 text-blue-300" />,
};

const FILE_BADGE: Record<string, string> = {
  pdf: "bg-red-500/10 text-red-400",
  video: "bg-blue-500/10 text-blue-400",
  doc: "bg-indigo-500/10 text-indigo-400",
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
  const resources = ((response as any)?.data as Resource[]) || [];
  const [search, setSearch] = useState("");

  const filtered = resources.filter((r) => {
    const q = search.toLowerCase();
    return (
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.course.toLowerCase().includes(q)
    );
  });

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

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
                  {FILE_ICON[res.type]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {res.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{res.course}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4 flex-shrink-0 w-full sm:w-auto">
                <span
                  className={`hidden sm:block px-2 py-0.5 rounded text-xs font-semibold uppercase ${FILE_BADGE[res.type]}`}
                >
                  {res.type}
                </span>
                <span className="hidden md:block text-xs text-gray-500">
                  {res.size}
                </span>
                <span className="hidden md:block text-xs text-gray-500">
                  {formatDate(res.uploadDate)}
                </span>
                <a
                  href={res.downloadUrl}
                  download
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
