import { useEffect } from "react";
import TestimonialCarousel from "../../components/TestimonialCarousel";

/**
 * Testimonials Section
 * Home page section for client success stories, styled like the Clients
 * section, featuring the auto-advancing TestimonialCarousel.
 */
const Testimonials = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const animatedElements = document.querySelectorAll(".scroll-animate");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-12 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Client <span className="text-cyan-500">Success Stories</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Real people who transformed their careers with Invade Tech
            Solutions.
          </p>
        </div>

        <div className="scroll-animate fade-in">
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
