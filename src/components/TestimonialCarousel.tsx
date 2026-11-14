import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { testimonials } from "../data/testimonialsData";

const AUTO_ADVANCE_MS = 4000;

/**
 * TestimonialCarousel
 * Fully automatic, responsive carousel that shows one testimonial at a time.
 * - Desktop (md+): square photo (320px) on the left, text on the right.
 * - Mobile: square photo on top, text stacked below.
 * - Advances every 4 seconds, looping back to the first testimonial, with a
 *   soft fade-in drift and a cyan glow on the photo. Pauses on hover.
 */
const TestimonialCarousel = () => {
  const total = testimonials.length;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance every 4 seconds, looping back to the first testimonial.
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const testimonial = testimonials[current];

  return (
    <div
      className="relative max-w-5xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Single key on the slide: the flow animation replays only when the
          slide changes, not on every render, so there is no jump. */}
      <div
        key={current}
        className="animate-testimonial-flow bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg shadow-cyan-500/5"
      >
        <div className="flex flex-col md:flex-row">
          {/* Photo */}
          <div className="w-full md:w-80 md:shrink-0">
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              className="animate-testimonial-photo-glow w-full aspect-square object-cover md:h-80 md:aspect-auto"
            />
          </div>

          {/* Text */}
          <div className="w-full md:flex-1 p-8 md:px-10 md:py-6 flex flex-col justify-center">
            <span className="self-start mb-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide text-cyan-400 bg-cyan-500/10">
              {testimonial.category}
            </span>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {testimonial.name}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-gray-400 line-through">
                {testimonial.previousRole}
              </span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-white">
                {testimonial.newRole}
              </span>
            </div>

            <p className="text-sm text-gray-400 mb-2">
              <span className="font-semibold text-cyan-400">Training:</span>{" "}
              {testimonial.training}
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-cyan-400">Current Role:</span>{" "}
              {testimonial.currentRole}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
