import { useState, useEffect } from 'react';
import { apiService } from '../../../lib/api';

interface Announcement {
  _id: string;
  title: string;
  message: string;
  priority: 'normal' | 'important' | 'urgent';
  assignedClass: any;
  isPublic: boolean;
  createdAt: string;
}

const priorityConfig = {
  urgent: { label: 'Urgent', className: 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' },
  important: { label: 'Important', className: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' },
  normal: { label: 'Normal', className: 'bg-gray-500/20 text-gray-400 border border-gray-500/30' },
};

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await apiService.getStudentAnnouncements();
        let data = response.data.data || [];
        // Sort by newest first
        data = data.sort((a: Announcement, b: Announcement) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setAnnouncements(data);
      } catch (err: any) {
        setError('Failed to load announcements');
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-gray-800/50 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Announcements</h1>
        <p className="text-gray-400 mt-1">Important updates and notices from your instructors.</p>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {announcements.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-4">📢</p>
          <p className="text-lg">No announcements at the moment</p>
          <p className="text-sm mt-1">Check back later for updates</p>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => {
            const priority = priorityConfig[announcement.priority] || priorityConfig.normal;
            return (
              <div key={announcement._id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priority.className}`}>
                      {priority.label}
                    </span>
                    {announcement.assignedClass ? (
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs">
                        {announcement.assignedClass.title} {announcement.assignedClass.batch}
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs">
                        Public
                      </span>
                    )}
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {new Date(announcement.createdAt).toLocaleDateString('en-NG', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{announcement.title}</h3>
                <p className="text-gray-400 leading-relaxed">{announcement.message}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
