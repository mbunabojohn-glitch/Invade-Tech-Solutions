import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useNewsById } from "../../hooks/useApi";
import { Calendar, Newspaper, ArrowLeft, AlertCircle, Clock, Share2 } from "lucide-react";
import { cleanArticleText } from "../../lib/text-utils";

/**
 * TechBuzzDetail Component
 * Displays the full details of a news article in a clean, blog-style layout.
 * Matches the dark blue/cyan professional theme.
 */
const TechBuzzDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Fetch article data using custom hook
  const { data: article, isLoading, isError, error } = useNewsById(id);

  const [imageError, setImageError] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
   * Scroll Animation Setup
   */
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [article, isLoading]);

  /**
   * Placeholder gradient for sources
   */
  const getSourceGradient = (source: string) => {
    const s = source.toLowerCase();
    if (s.includes("techcrunch")) return "from-emerald-900 via-emerald-800 to-gray-950";
    if (s.includes("bbc")) return "from-red-900 via-red-800 to-gray-950";
    if (s.includes("verge")) return "from-purple-900 via-purple-800 to-gray-950";
    return "from-cyan-900 via-cyan-800 to-gray-950";
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-950 pt-32">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 mb-6">
            <AlertCircle className="w-6 h-6 mr-2" />
            <span className="font-medium">Failed to load article</span>
          </div>
          <p className="text-gray-400 mb-8">{(error as any)?.message || "An unexpected error occurred."}</p>
          <button
            onClick={() => navigate("/tech-buzz")}
            className="inline-flex items-center text-cyan-500 font-semibold hover:text-cyan-400"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Tech Buzz
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 pt-32">
        <div className="max-w-4xl mx-auto px-4 animate-pulse">
          <div className="h-4 bg-gray-900 rounded w-24 mb-6" />
          <div className="h-[50vh] bg-gray-900 rounded-3xl mb-12" />
          <div className="max-w-2xl mx-auto">
            <div className="h-12 bg-gray-900 rounded w-full mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-900 rounded w-full" />
              <div className="h-4 bg-gray-900 rounded w-full" />
              <div className="h-4 bg-gray-900 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pb-20 overflow-x-hidden">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <button
            onClick={() => navigate("/tech-buzz")}
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors group font-bold text-sm uppercase tracking-widest"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-2" />
            Back to Tech Buzz
          </button>
          <div className="hidden md:block text-xs font-black text-cyan-500 uppercase tracking-[0.3em]">
            Article View
          </div>
          <button className="p-2 text-gray-400 hover:text-cyan-500 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Image Section */}
      <section className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] shadow-2xl scroll-animate scale-in">
            {(article.imageUrl || article.image) && !imageError ? (
              <img
                src={article.imageUrl || article.image}
                alt={article.title}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${getSourceGradient(article.source)} flex items-center justify-center`}>
                <Newspaper className="w-32 h-32 text-white/10" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-20 relative z-10">
        <article className="bg-gray-900/40 backdrop-blur-2xl border border-white/5 rounded-2xl md:rounded-[2.5rem] p-6 md:p-16 shadow-2xl scroll-animate slide-right">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 md:mb-10 pb-6 md:pb-10 border-b border-white/5">
            <div className="flex items-center text-gray-400 text-xs md:text-sm font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 md:w-4 h-3.5 md:h-4 mr-2 text-cyan-500" />
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center text-gray-400 text-xs md:text-sm font-bold uppercase tracking-wider">
              <Clock className="w-3.5 md:w-4 h-3.5 md:h-4 mr-2 text-cyan-500" />
              5 min read
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-6xl font-black text-white leading-tight md:leading-[1.1] mb-8 md:mb-12 tracking-tight">
            {cleanArticleText(article.title)}
          </h1>

          {/* Content Summary */}
          <div className="max-w-none">
            {cleanArticleText(article.summary)
              .split(/\n+/)
              .filter(p => p.trim())
              .map((paragraph, index) => (
                <p 
                  key={index}
                  className={`text-lg md:text-2xl text-gray-300 leading-relaxed font-medium mb-6 md:mb-8 ${
                    index === 0 ? "first-letter:text-4xl md:first-letter:text-5xl first-letter:font-black first-letter:text-cyan-500 first-letter:mr-2 md:first-letter:mr-3 first-letter:float-left" : ""
                  }`}
                >
                  {paragraph.trim()}
                </p>
              ))}
          </div>

        </article>

        {/* Footer Navigation */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/tech-buzz"
            className="text-gray-500 hover:text-cyan-500 font-bold transition-colors flex items-center gap-2 uppercase tracking-widest text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Explore More Buzz
          </Link>
        </div>
      </main>
    </div>
  );
};

export default TechBuzzDetail;
