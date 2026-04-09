// src/pages/Home/Hero.tsx
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-900/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Main Headline - Animates first */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight opacity-0 animate-fade-in-up">
              Build Stronger, Faster,{" "}
              <span className="text-cyan-400">More Efficient Systems</span>
            </h1>

            {/* Description - Animates second */}
            <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-2xl opacity-0 animate-fade-in-up-delay-1">
              We help businesses grow and operate efficiently through reliable
              IT solutions, expert consulting, and tailored technical support.
            </p>

            {/* CTA Buttons - Animates third */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up-delay-2">
              <Link
                to="/services"
                className="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 text-center shadow-lg shadow-cyan-500/30"
              >
                Get Started
              </Link>

              <Link
                to="/about"
                className="px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-cyan-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
