import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../store/useAppStore";
import { useStudentDashboardStats } from "../../../hooks/useApi";
import {
  BookOpen,
  Video,
  ClipboardList,
  Calendar,
  Clock,
  Bell,
  ArrowRight,
} from "lucide-react";

interface ScheduleItem {
  _id: string;
  title: string;
  type: "class" | "webinar";
  date: string;
  time: string;
  instructor: string;
  joinLink?: string;
}

interface Announcement {
  _id: string;
  title: string;
  message?: string;
  preview?: string;
  createdAt?: string;
  date?: string;
  isNew?: boolean;
}

// Removed unused MOCK_SCHEDULE and MOCK_ANNOUNCEMENTS

export default function StudentOverview() {
  const navigate = useNavigate();
  const [expandedAnnouncement, setExpandedAnnouncement] = useState<string | null>(null);
  const studentUser = useAppStore((state) => state.studentUser);

  const { data: response, isLoading: loading } = useStudentDashboardStats();

  // The backend returns { success: true, data: { enrolledClassesCount, upcomingWebinars, announcements } }
  const dashboardData = (response as { data?: any })?.data || {};

  const stats = {
    classesEnrolled: (dashboardData.enrolledClassesCount as number) || 0,
    upcomingWebinars: (dashboardData.upcomingWebinars?.length as number) || 0,
    assignmentsDue: 0, // Not currently provided by backend
  };
  const schedule = (dashboardData.upcomingWebinars as ScheduleItem[]) || [];
  const announcements = (dashboardData.announcements as Announcement[]) || [];

  const formatScheduleDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time: string) => { 
    if (!time) return ''; 
    if (time.includes('AM') || time.includes('PM')) return time; 
    const [hours, minutes] = time.split(':'); 
    const hour = parseInt(hours); 
    const ampm = hour >= 12 ? 'PM' : 'AM'; 
    const displayHour = hour % 12 || 12; 
    return `${displayHour}:${minutes} ${ampm}`; 
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Welcome back, {studentUser?.fullName || "Student"}! 👋
        </h2>
        <p className="text-gray-400 mt-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">
                Classes Enrolled
              </p>
              <p className="text-3xl font-bold text-white mt-2">
                {stats.classesEnrolled}
              </p>
            </div>
            <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-cyan-500" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">
                Upcoming Webinars
              </p>
              <p className="text-3xl font-bold text-white mt-2">
                {stats.upcomingWebinars}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">
                Assignments Due
              </p>
              <p className="text-3xl font-bold text-white mt-2">
                {stats.assignmentsDue}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              Upcoming Schedule
            </h3>
            <button
              onClick={() => navigate("/student/classes")}
              className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              View All
            </button>
          </div>

          {schedule.length === 0 ? (
            <div className="text-center py-10">
              <Calendar className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No upcoming classes or webinars.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {schedule.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 bg-slate-800 rounded-xl border border-slate-700/50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        item.type === "webinar"
                          ? "bg-blue-500/10"
                          : "bg-cyan-500/10"
                      }`}
                    >
                      {item.type === "webinar" ? (
                        <Video className="w-5 h-5 text-blue-400" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-cyan-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-sm truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400">{item.instructor}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-white">
                        {formatScheduleDate(item.date)}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" /> {formatTime(item.time)}
                      </p>
                    </div>
                    <button
                      onClick={() => item.joinLink && navigate(item.joinLink)}
                      className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-gray-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                      Join
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              Announcements
            </h3>
            <div className="flex items-center gap-2">
              {announcements.filter((a) => a.isNew).length > 0 && (
                <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-full">
                  {announcements.filter((a) => a.isNew).length} new
                </span>
              )}
              <button
                onClick={() => navigate("/student/announcements")}
                className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                View All
              </button>
            </div>
          </div>

          {announcements.length === 0 ? (
            <div className="text-center py-10">
              <Bell className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No announcements yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {announcements.map((announcement) => (
                <div 
                  key={announcement._id} 
                  onClick={() => setExpandedAnnouncement(
                    expandedAnnouncement === announcement._id ? null : announcement._id
                  )} 
                  className={`cursor-pointer bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors ${
                    announcement.isNew ? "border border-cyan-500/20" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-white font-medium text-sm">{announcement.title}</p> 
                    {announcement.isNew && (
                      <span className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                  
                  {expandedAnnouncement === announcement._id && ( 
                    <p className="text-gray-400 text-sm mt-2">{announcement.message || announcement.preview}</p> 
                  )} 
                  
                  <p className="text-gray-500 text-xs mt-1"> 
                    {announcement.createdAt ? new Date(announcement.createdAt).toLocaleDateString('en-NG', { 
                      day: 'numeric', month: 'short', year: 'numeric' 
                    }) : announcement.date ? new Date(announcement.date).toLocaleDateString('en-NG', { 
                      day: 'numeric', month: 'short', year: 'numeric' 
                    }) : ''}
                  </p> 
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
