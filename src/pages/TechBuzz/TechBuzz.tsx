import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNews } from "../../hooks/useApi";
import { Calendar, Newspaper, ArrowRight, AlertCircle, Clock } from "lucide-react";
import { cleanArticleText } from "../../lib/text-utils";

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
      <section className="pt-24 md:pt-32 pb-8 md:pb-12 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
            <div className="scroll-animate fade-in text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-3 md:mb-4 tracking-tighter">
                TECH <span className="text-cyan-500 italic">BUZZ</span>
              </h1>
              <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto md:mx-0">
                The pulse of technology. AI-curated news, jobs, and webinars from the global tech ecosystem.
              </p>
            </div>
            
            {/* Category Tabs */}
            <div className="w-full overflow-hidden">
              <div className="flex flex-nowrap overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:flex-wrap gap-3 scroll-animate fade-in delay-200 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSearchParams({ category: cat })}
                    className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex-shrink-0 ${
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
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-x-hidden">
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
                  <div className="relative aspect-[4/3] sm:aspect-video md:aspect-[21/9] w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
                    {(featuredArticle.imageUrl || featuredArticle.image) && !imageErrors[featuredArticle._id] ? (
                      <img
                        src={featuredArticle.imageUrl || featuredArticle.image}
                        alt={featuredArticle.title}
                        onError={() => handleImageError(featuredArticle._id)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getSourceGradient(featuredArticle.source)} flex items-center justify-center`}>
                        <Newspaper className="w-16 md:w-24 h-16 md:h-24 text-white/10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-12">
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-6">
                        <span className="px-3 md:px-4 py-1 md:py-1.5 rounded-md bg-cyan-500 text-gray-950 text-[10px] md:text-xs font-black uppercase tracking-widest">
                          {featuredArticle.source}
                        </span>
                        <div className="flex items-center text-gray-300 text-xs md:text-sm font-medium">
                          <Clock className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                          {new Date(featuredArticle.publishedAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-6xl font-black text-white mb-3 md:mb-6 max-w-4xl leading-tight md:leading-[1.1] group-hover:text-cyan-400 transition-colors line-clamp-2 md:line-clamp-none">
                        {cleanArticleText(featuredArticle.title)}
                      </h2>
                      <p className="text-gray-300 text-sm md:text-xl max-w-3xl line-clamp-2 mb-4 md:mb-8 leading-relaxed">
                        {cleanArticleText(featuredArticle.summary)}
                      </p>
                      <button className="inline-flex items-center gap-2 bg-white text-gray-950 px-5 md:px-8 py-2.5 md:py-4 rounded-lg md:rounded-xl text-sm md:text-base font-bold hover:bg-cyan-500 transition-colors">
                        Read Full Article
                        <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
                      </button>
                    </div>
                  </div>
                </Link>
              </article>
            )}

            {/* Remaining Articles List */}
            <div className="grid grid-cols-1 gap-10 md:gap-16">
              {remainingArticles?.map((article, index) => (
                <article
                  key={article._id}
                  className={`group flex flex-col md:flex-row gap-6 md:gap-10 items-start scroll-animate ${
                    index % 2 === 0 ? 'slide-right' : 'slide-left'
                  } border-b border-gray-800/50 pb-10 md:pb-16 last:border-0`}
                >
                  <div className="w-full md:w-[400px] aspect-video md:aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden shrink-0 relative shadow-2xl">
                    {(article.imageUrl || article.image) && !imageErrors[article._id] ? (
                      <img
                        src={article.imageUrl || article.image}
                        alt={article.title}
                        onError={() => handleImageError(article._id)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getSourceGradient(article.source)} flex items-center justify-center`}>
                        <Newspaper className="w-12 md:w-16 h-12 md:h-16 text-white/10" />
                      </div>
                    )}
                    <div className="absolute top-3 md:top-4 left-3 md:left-4">
                      <span className="px-2 md:px-3 py-1 rounded-md bg-gray-950/80 backdrop-blur-md border border-white/10 text-cyan-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                        {article.source}
                      </span>
                    </div>
                  </div>

                  <div className="flex-grow space-y-3 md:space-y-6">
                    <div className="flex items-center text-gray-500 text-xs md:text-sm font-bold uppercase tracking-wider">
                      <Calendar className="w-3.5 md:w-4 h-3.5 md:h-4 mr-2 text-cyan-500" />
                      {new Date(article.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <Link to={`/tech-buzz/${article._id}`}>
                      <h3 className="text-xl md:text-3xl font-black text-white group-hover:text-cyan-500 transition-colors leading-tight">
                        {cleanArticleText(article.title)}
                      </h3>
                    </Link>
                    <div className="text-gray-400 text-base md:text-lg leading-relaxed line-clamp-2 md:line-clamp-3">
                      {cleanArticleText(article.summary)}
                    </div>
                    <Link
                      to={`/tech-buzz/${article._id}`}
                      className="inline-flex items-center gap-2 text-white text-sm md:text-base font-bold hover:text-cyan-500 transition-colors group/link"
                    >
                      <span className="border-b-2 border-cyan-500 pb-1">Read Full Article</span>
                      <ArrowRight className="w-4 md:w-5 h-4 md:h-5 transition-transform group-hover/link:translate-x-2" />
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
