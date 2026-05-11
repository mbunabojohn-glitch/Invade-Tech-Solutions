import { useState } from "react";
import { Video, Monitor, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WHITEBOARD_TOOLS = [
  { id: "pen", label: "Pen", icon: "✏️" },
  { id: "eraser", label: "Eraser", icon: "⬜" },
  { id: "rect", label: "Shape", icon: "▭" },
  { id: "text", label: "Text", icon: "T" },
  { id: "clear", label: "Clear", icon: "🗑️" },
];

const MOCK_CHAT = [
  {
    id: "1",
    sender: "Mr. Adeyemi",
    message: "Welcome everyone! We will start in 2 minutes.",
    time: "10:00 AM",
    isInstructor: true,
  },
  {
    id: "2",
    sender: "Chukwuemeka",
    message: "Good morning sir!",
    time: "10:01 AM",
    isInstructor: false,
  },
  {
    id: "3",
    sender: "Amaka",
    message: "Ready to learn 🚀",
    time: "10:01 AM",
    isInstructor: false,
  },
  {
    id: "4",
    sender: "Mr. Adeyemi",
    message: "Today we'll cover hardware diagnostics and troubleshooting.",
    time: "10:02 AM",
    isInstructor: true,
  },
];

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  isInstructor: boolean;
}

export function Classroom() {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState("pen");
  const [activeColor, setActiveColor] = useState("#06b6d4");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(MOCK_CHAT);

  const COLORS = [
    "#06b6d4",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ffffff",
  ];

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        sender: "You",
        message: chatInput.trim(),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isInstructor: false,
      },
    ]);
    setChatInput("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-white">
              IT Support & Hardware Maintenance
            </h2>
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-xs font-semibold text-red-400">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              LIVE
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            Mr. Adeyemi · Session started 10:00 AM
          </p>
        </div>
        <button
          onClick={() => navigate("/student/dashboard")}
          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-semibold text-sm rounded-lg transition-colors"
        >
          Leave Class
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 h-[calc(100vh-220px)] min-h-[500px]">
        <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 flex flex-col overflow-hidden order-2 lg:order-1">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 flex-wrap">
            {WHITEBOARD_TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => tool.id !== "clear" && setActiveTool(tool.id)}
                title={tool.label}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTool === tool.id && tool.id !== "clear"
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-gray-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {tool.icon}
              </button>
            ))}
            <div className="flex items-center gap-1.5 ml-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setActiveColor(color)}
                  className={`w-5 h-5 rounded-full transition-all ${
                    activeColor === color
                      ? "ring-2 ring-white ring-offset-1 ring-offset-slate-900 scale-110"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 bg-slate-950 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-10 h-10 text-slate-600" />
              </div>
              <p className="text-gray-400 font-medium mb-1">
                Collaborative Whiteboard
              </p>
              <p className="text-gray-600 text-sm">
                Install Excalidraw to enable live drawing:
              </p>
              <code className="block mt-2 px-3 py-1.5 bg-slate-800 rounded-lg text-cyan-400 text-xs">
                npm install @excalidraw/excalidraw
              </code>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 overflow-hidden order-1 lg:order-2">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center h-44">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-2">
              <Video className="w-6 h-6 text-slate-600" />
            </div>
            <p className="text-gray-400 text-sm font-medium">Live Video</p>
            <p className="text-gray-600 text-xs mt-1 text-center">
              Embed Jitsi or Daily.co here
            </p>
          </div>

          <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 flex flex-col overflow-hidden min-h-0">
            <div className="px-4 py-3 border-b border-slate-800">
              <p className="text-sm font-semibold text-white">Class Chat</p>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      msg.isInstructor ? "bg-cyan-600" : "bg-slate-700"
                    } text-white`}
                  >
                    {msg.sender.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs font-semibold ${
                          msg.isInstructor ? "text-cyan-400" : "text-gray-300"
                        }`}
                      >
                        {msg.sender}
                      </span>
                      <span className="text-xs text-gray-600">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 break-words">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
              />
              <button
                onClick={sendMessage}
                className="px-3 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
