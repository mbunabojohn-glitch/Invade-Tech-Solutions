import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Video,
  Monitor,
  FolderOpen,
  LogOut,
  GraduationCap,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

// ─── Nav Items ────────────────────────────────────────────────────────────────
// Each item maps to a student portal route and a Lucide icon
const NAV_ITEMS = [
  { label: "Overview", path: "/student/dashboard", icon: LayoutDashboard },
  { label: "My Classes", path: "/student/classes", icon: BookOpen },
  { label: "Webinars", path: "/student/webinars", icon: Video },
  { label: "Classroom", path: "/student/classroom", icon: Monitor },
  { label: "Resources", path: "/student/resources", icon: FolderOpen },
];

// ─── Sidebar Content Component ────────────────────────────────────────────────
interface SidebarContentProps {
  isActive: (path: string) => boolean;
  setSidebarOpen: (open: boolean) => void;
  studentInitial: string;
  studentName: string;
  studentEmail: string;
  handleLogout: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

function SidebarContent({
  isActive,
  setSidebarOpen,
  studentInitial,
  studentName,
  studentEmail,
  handleLogout,
  isCollapsed,
  setIsCollapsed,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full relative">
      {/* Collapse Toggle Button (Desktop only) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full items-center justify-center text-gray-400 hover:text-white z-50 shadow-md transition-transform hover:scale-110"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo + branding */}
      <div className={`p-6 border-b border-slate-800 ${isCollapsed ? "px-4" : ""}`}>
        <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-9 h-9 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
          </div>
          {!isCollapsed && (
            <div className="animate-in fade-in slide-in-from-left-2 duration-300">
              <p className="text-white font-bold text-sm leading-tight whitespace-nowrap">
                Invade Tech
              </p>
              <p className="text-cyan-400 text-xs">Student Portal</p>
            </div>
          )}
        </Link>
      </div>

      {/* Student info pill */}
      <div className={`px-4 py-4 border-b border-slate-800 ${isCollapsed ? "px-2" : ""}`}>
        <div className={`flex items-center gap-3 p-3 bg-slate-800/60 rounded-xl transition-all duration-300 ${isCollapsed ? "justify-center p-2" : ""}`}>
          <div className="w-9 h-9 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg shadow-cyan-900/20">
            {studentInitial}
          </div>
          {!isCollapsed && (
            <div className="min-w-0 animate-in fade-in slide-in-from-left-2 duration-300">
              <p className="text-white text-sm font-semibold truncate">
                {studentName}
              </p>
              <p className="text-gray-400 text-xs truncate">{studentEmail}</p>
            </div>
          )}
        </div>
      </div>

      {/* Nav links */}
      <nav className={`flex-1 px-3 py-4 space-y-1 ${isCollapsed ? "px-2" : ""}`}>
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            onClick={() => setSidebarOpen(false)}
            title={isCollapsed ? label : ""}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
              isActive(path)
                ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20"
                : "text-gray-400 hover:text-white hover:bg-slate-800 border border-transparent"
            } ${isCollapsed ? "justify-center px-2" : ""}`}
          >
            <Icon
              className={`w-4 h-4 flex-shrink-0 transition-colors ${
                isActive(path)
                  ? "text-cyan-400"
                  : "text-gray-500 group-hover:text-gray-300"
              }`}
            />
            {!isCollapsed && (
              <span className="animate-in fade-in slide-in-from-left-2 duration-300">
                {label}
              </span>
            )}
            {!isCollapsed && isActive(path) && (
              <ChevronRight className="w-3 h-3 ml-auto text-cyan-400" />
            )}
            
            {/* Tooltip for collapsed state (custom fallback if title isn't enough) */}
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-slate-700 shadow-xl">
                {label}
              </div>
            )}
          </Link>
        ))}
      </nav>

      {/* Logout button — pinned to bottom */}
      <div className={`p-4 border-t border-slate-800 ${isCollapsed ? "px-2" : ""}`}>
        <button
          onClick={handleLogout}
          title={isCollapsed ? "Logout" : ""}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group relative ${
            isCollapsed ? "justify-center px-2" : ""
          }`}
        >
          <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
          {!isCollapsed && (
            <span className="animate-in fade-in slide-in-from-left-2 duration-300">
              Logout
            </span>
          )}
          {isCollapsed && (
            <div className="absolute left-full ml-4 px-2 py-1 bg-red-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-red-800 shadow-xl">
              Logout
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function StudentDashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const studentUser = useAppStore((state) => state.studentUser);
  const studentLogout = useAppStore((state) => state.studentLogout);

  // ── Sidebar states ─────────────────────────────────────────────────────────
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // ── Helper: is this nav item the active route? ──────────────────────────────
  const isActive = (path: string) => location.pathname === path;

  const studentInitial = studentUser?.fullName?.charAt(0).toUpperCase() ?? "S";
  const studentName = studentUser?.fullName ?? "Student Name";
  const studentEmail = studentUser?.email ?? "student@email.com";

  // ─── Logout Handler ───────────────────────────────────────────────────────
  const handleLogout = () => {
    studentLogout();
    navigate("/student/login");
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <aside
        className={`hidden lg:flex flex-col bg-slate-900 border-r border-slate-800 flex-shrink-0 fixed top-0 left-0 h-full z-30 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent
          isActive={isActive}
          setSidebarOpen={setSidebarOpen}
          studentInitial={studentInitial}
          studentName={studentName}
          studentEmail={studentEmail}
          handleLogout={handleLogout}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </aside>

      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 z-50 lg:hidden flex flex-col">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent
              isActive={isActive}
              setSidebarOpen={setSidebarOpen}
              studentInitial={studentInitial}
              studentName={studentName}
              studentEmail={studentEmail}
              handleLogout={handleLogout}
              isCollapsed={false} // Always expanded on mobile
              setIsCollapsed={() => {}} // No collapse on mobile
            />
          </aside>
        </>
      )}

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 sticky top-0 z-20">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            <span className="text-white font-bold text-sm">Student Portal</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
