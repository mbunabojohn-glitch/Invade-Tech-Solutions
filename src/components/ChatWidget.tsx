import React, { useState, useRef, useEffect } from 'react';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; text: string; time: string }>>([
    {
      role: 'bot',
      text: 'Hey there! 👋 Welcome to Invade Tech Solutions.\n\nI can help you with our IT services, tech training programs, shop products, or general enquiries. What can I assist you with today?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationHistory = useRef<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getTime = () => {
    return new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
  };

  const SYSTEM_PROMPT = `You are the AI customer support assistant for Invade Tech Solutions, a Lagos-based IT services and tech company in Nigeria. You are friendly, professional, and knowledgeable.

About the company:
- Name: Invade Tech Solutions
- Location: Lagos, Nigeria
- Website: https://www.invadetechsolutionz.com
- Services: IT support, IT consulting, cybersecurity training, cloud infrastructure, web development, hardware support
- Products: Quality tech products available in the online shop
- Training: Tech training programs available for individuals and businesses
- Tagline: "Let's build Smarter, Stronger and more Efficient Systems together"

Your role:
- Help customers with enquiries about services, products, training programs
- Answer questions about pricing, availability, and how to get started
- Be warm and professional with a slight Nigerian tech-forward personality
- If you don't know a specific detail (like exact prices), encourage them to contact the team directly via the website
- Keep replies concise — 2-4 sentences unless a detailed answer is clearly needed
- Never make up specific prices, stock availability, or dates you don't know
- Always end with a helpful follow-up offer if appropriate`;

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage, time: getTime() }]);
    conversationHistory.current.push({ role: 'user', content: userMessage });
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: conversationHistory.current,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      const botReply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Please try again!";

      conversationHistory.current.push({ role: 'assistant', content: botReply });
      setMessages((prev) => [...prev, { role: 'bot', text: botReply, time: getTime() }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, {
        role: 'bot',
        text: "Oops! Something went wrong. Please refresh and try again, or contact us directly at invadetechsolutionz.com.",
        time: getTime()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickReplies = [
    'What services do you offer?',
    'Tell me about your tech training',
    'What products are in the shop?',
    'How do I contact support?',
  ];

  return (
    <>
      <style>{`
        @keyframes bounce-animation {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-animation {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-bounce-custom {
          animation: bounce-animation 2s infinite;
        }
        .animate-pulse-custom {
          animation: pulse-animation 2s infinite;
        }
      `}</style>

      {/* Floating Button with Animated Label */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {/* Animated Label */}
          <div className="animate-bounce-custom bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg whitespace-nowrap">
            💬 Chat with our bot
          </div>
          
          {/* Chat Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="animate-pulse-custom w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
            title="Open chat"
          >
            <span className="text-2xl">💬</span>
          </button>
        </div>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                IT
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Invade Tech Assistant</div>
                <div className="text-xs text-cyan-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'bot' && (
                  <div className="w-6 h-6 bg-cyan-500/20 border border-cyan-500/50 rounded-lg flex items-center justify-center flex-shrink-0 text-xs text-cyan-400">
                    IT
                  </div>
                )}
                <div className={`max-w-xs ${msg.role === 'user' ? 'bg-cyan-500 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'} px-4 py-2 rounded-2xl text-sm`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div className={`text-xs mt-1 ${msg.role === 'user' ? 'text-cyan-100' : 'text-slate-500'}`}>{msg.time}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-cyan-500/20 border border-cyan-500/50 rounded-lg flex-shrink-0"></div>
                <div className="bg-slate-800 px-4 py-2 rounded-2xl rounded-bl-none flex gap-1">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => {
                    setInput(reply);
                    setTimeout(() => {
                      const btn = document.activeElement as HTMLElement;
                      if (btn) btn.blur();
                    }, 0);
                  }}
                  className="text-xs px-3 py-1.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-full hover:bg-cyan-500/30 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-700 p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask me anything..."
              className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="w-9 h-9 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white rounded-lg flex items-center justify-center transition-colors"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
