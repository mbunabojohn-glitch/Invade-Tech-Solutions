import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNews } from "../../hooks/useApi";
import { Calendar, Newspaper, ArrowRight, AlertCircle, Clock } from "lucide-react";

/**
 * TechBuzz Component
 * Displays a magazine-style news page with category filtering.
 * Features a hero featured article followed by a list of articles.
 */
const TechBuzz = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "Tech News";

  // Fetch news data using custom hook with category parameter
  const { data: news, isLoading, isError, error } = useNews(currentCategory);

  const categories = ["Tech News", "Job Search", "Tech Webinars"];

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (articleId: string) => {
    setImageErrors((prev) => ({ ...prev, [articleId]: true }));
  };

  /**
   * Scroll Animation Setup
   * Uses Intersection Observer to trigger fade-in animations as articles enter the viewport.
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
  }, [news, isLoading]);

  /**
   * Returns a Tailwind gradient class based on the news source.
   * Used as a placeholder background when no image is available.
   * @param source The name of the news source
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
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 mb-6">
            <AlertCircle className="w-6 h-6 mr-2" />
            <span className="font-medium">Failed to load Tech Buzz</span>
          </div>
          <p className="text-gray-400">{(error as any)?.message || "An unexpected error occurred."}</p>
        </div>
      </div>
    );
  }

  const featuredArticle = news?.[0];
  const remainingArticles = news?.slice(1);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header & Categories */}
      <section className="pt-32 pb-12 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="scroll-animate fade-in">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                TECH <span className="text-cyan-500 italic">BUZZ</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-xl">
                The pulse of technology. AI-curated news, jobs, and webinars from the global tech ecosystem.
              </p>
            </div>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 scroll-animate fade-in delay-100">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSearchParams({ category: cat })}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    currentCategory === cat
                      ? "bg-cyan-500 text-gray-950 scale-105 shadow-lg shadow-cyan-500/20"
                      : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="space-y-12">
            <div className="w-full h-[60vh] bg-gray-900 animate-pulse rounded-3xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[1, 2, 3].map(i => (
                 <div key={i} className="space-y-4">
                   <div className="w-full h-48 bg-gray-900 animate-pulse rounded-2xl" />
                   <div className="h-4 bg-gray-900 animate-pulse rounded w-3/4" />
                   <div className="h-4 bg-gray-900 animate-pulse rounded w-1/2" />
                 </div>
               ))}
            </div>
          </div>
        ) : (
          <div className="space-y-24">
            {/* Featured Hero Article */}
            {featuredArticle && (
              <article className="group relative scroll-animate fade-in">
                <Link to={`/tech-buzz/${featuredArticle._id}`} className="block">
                  <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl shadow-2xl">
                    {(featuredArticle.imageUrl || featuredArticle.image) && !imageErrors[featuredArticle._id] ? (
                      <img
                        src={featuredArticle.imageUrl || featuredArticle.image}
                        alt={featuredArticle.title}
                        onError={() => handleImageError(featuredArticle._id)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getSourceGradient(featuredArticle.source)} flex items-center justify-center`}>
                        <Newspaper className="w-24 h-24 text-white/10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="px-4 py-1.5 rounded-md bg-cyan-500 text-gray-950 text-xs font-black uppercase tracking-widest">
                          {featuredArticle.source}
                        </span>
                        <div className="flex items-center text-gray-300 text-sm font-medium">
                          <Clock className="w-4 h-4 mr-2" />
                          {new Date(featuredArticle.publishedAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                      <h2 className="text-4xl md:text-6xl font-black text-white mb-6 max-w-4xl leading-[1.1] group-hover:text-cyan-400 transition-colors">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-gray-300 text-xl max-w-3xl line-clamp-2 mb-8 leading-relaxed">
                        {featuredArticle.summary}
                      </p>
                      <button className="inline-flex items-center gap-2 bg-white text-gray-950 px-8 py-4 rounded-xl font-bold hover:bg-cyan-500 transition-colors">
                        Read Full Article
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Link>
              </article>
            )}

            {/* Remaining Articles List */}
            <div className="grid grid-cols-1 gap-16">
              {remainingArticles?.map((article) => (
                <article
                  key={article._id}
                  className="group flex flex-col md:flex-row gap-10 items-start scroll-animate fade-in border-b border-gray-800/50 pb-16 last:border-0"
                >
                  <div className="w-full md:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden shrink-0 relative shadow-2xl">
                    {(article.imageUrl || article.image) && !imageErrors[article._id] ? (
                      <img
                        src={article.imageUrl || article.image}
                        alt={article.title}
                        onError={() => handleImageError(article._id)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getSourceGradient(article.source)} flex items-center justify-center`}>
                        <Newspaper className="w-16 h-16 text-white/10" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-md bg-gray-950/80 backdrop-blur-md border border-white/10 text-cyan-500 text-[10px] font-black uppercase tracking-widest">
                        {article.source}
                      </span>
                    </div>
                  </div>

                  <div className="flex-grow space-y-6">
                    <div className="flex items-center text-gray-500 text-sm font-bold uppercase tracking-wider">
                      <Calendar className="w-4 h-4 mr-2 text-cyan-500" />
                      {new Date(article.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <Link to={`/tech-buzz/${article._id}`}>
                      <h3 className="text-3xl font-black text-white group-hover:text-cyan-500 transition-colors leading-tight">
                        {article.title}
                      </h3>
                    </Link>
                    <div className="text-gray-400 text-lg leading-relaxed line-clamp-3">
                      {article.summary}
                    </div>
                    <Link
                      to={`/tech-buzz/${article._id}`}
                      className="inline-flex items-center gap-2 text-white font-bold hover:text-cyan-500 transition-colors group/link"
                    >
                      <span className="border-b-2 border-cyan-500 pb-1">Read Full Article</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover/link:translate-x-2" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
        
        {!isLoading && news?.length === 0 && (
          <div className="py-20 text-center">
            <Newspaper className="w-16 h-16 text-gray-800 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-500">No articles found in this category</h3>
            <p className="text-gray-600 mt-2">Please check back later for more updates.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TechBuzz;
