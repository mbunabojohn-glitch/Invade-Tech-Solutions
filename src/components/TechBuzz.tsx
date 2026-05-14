import React, { useEffect } from "react";
import { useNews } from "../hooks/useApi";
import { ExternalLink, Calendar, AlertCircle, Newspaper } from "lucide-react";

const TechBuzz = () => {
  const { data: news, isLoading, isError, error } = useNews();

  const getSourceGradient = (source: string) => {
    const s = source.toLowerCase();
    if (s.includes("techcrunch")) return "from-red-900 via-red-800 to-gray-950";
    if (s.includes("bbc")) return "from-blue-900 via-blue-800 to-gray-950";
    if (s.includes("the verge")) return "from-purple-900 via-purple-800 to-gray-950";
    if (s.includes("ars technica")) return "from-orange-900 via-orange-800 to-gray-950";
    return "from-gray-800 to-gray-900";
  };

  // Scroll animation setup
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
  }, [news, isLoading]);

  if (isError) {
    return (
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 mb-6">
            <AlertCircle className="w-6 h-6 mr-2" />
            <span className="font-medium">Failed to load Tech Buzz</span>
          </div>
          <p className="text-gray-400">{(error as any)?.message || "An unexpected error occurred."}</p>
        </div>
      </section>
    );
  }

  const latestNews = news?.slice(0, 6) || [];

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tech <span className="text-cyan-500">Buzz</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stay updated with the latest technology news from around the world
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? // Loading Skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-800" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-800 rounded w-1/4" />
                    <div className="h-6 bg-gray-800 rounded w-3/4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-800 rounded w-full" />
                      <div className="h-4 bg-gray-800 rounded w-full" />
                      <div className="h-4 bg-gray-800 rounded w-2/3" />
                    </div>
                    <div className="h-10 bg-gray-800 rounded w-full mt-4" />
                  </div>
                </div>
              ))
            : // News Cards
              latestNews.map((article) => (
                <article
                  key={article.id}
                  className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden flex flex-col group hover:border-cyan-500/50 transition-all duration-300 scroll-animate fade-in"
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getSourceGradient(article.source)} flex items-center justify-center`}>
                        <Newspaper className="w-12 h-12 text-white/20" />
                      </div>
                    )}
                    {/* Source Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-cyan-500 text-gray-950 text-xs font-bold uppercase tracking-wider">
                        {article.source}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-gray-500 text-xs mb-3">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(article.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-500 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                    <div className="mt-auto">
                      <a
                        href={article.originalUrl || article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-gray-800 text-white font-semibold hover:bg-cyan-500 hover:text-gray-950 transition-all duration-300 group/btn"
                      >
                        <span>Read More</span>
                        <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
};

export default TechBuzz;
