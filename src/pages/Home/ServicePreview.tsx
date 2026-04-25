import { Link } from "react-router-dom";
import { useEffect } from "react";
import { services as staticServices } from "../../data/servicesData";
import { type Service as StaticService } from "../../data/servicesData";
import { type Service as ApiService } from "../../lib/api";
import { useServices } from "../../hooks/useApi";

const ServicePreview = () => {
  const { data: dynamicServices } = useServices();
  
  // Ensure services is always an array to prevent crashes if API returns unexpected data
  // Only use dynamic services if they are complete (at least as many as static services)
  const services = Array.isArray(dynamicServices) && dynamicServices.length >= staticServices.length ? dynamicServices : staticServices;

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

    // Observe all elements with scroll-animate class
    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-cyan-500">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive IT solutions designed to empower your business and
            drive digital transformation
          </p>
        </div>

        {/* 
          Services Grid: Responsive layout for all services 
          - flex-wrap: Allows cards to move to the next row as screen size changes
          - justify-center: Ensures that any cards on a final row that don't fill the full width are centered
          - gap-6: Adds 24px spacing between cards
        */}
        <div className="flex flex-wrap justify-center gap-6">
          {services.map((service: ApiService | StaticService) => (
            <div
              key={service.id}
              /* 
                Responsive widths:
                - w-full: 1 column on mobile
                - md:w-[calc(50%-12px)]: 2 columns on tablet (50% minus half the gap)
                - lg:w-[calc(33.333%-16px)]: 3 columns on desktop (33.3% minus two-thirds of the gap)
              */
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <Link
                to="/services"
                className="group relative h-80 overflow-hidden rounded-lg scroll-animate fade-in block w-full"
              >
                {/* Background: Image */}
                {service.image ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900" />
                )}

                {/* Pattern Overlay for depth */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-300" />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                  {/* Title with Border Frame */}
                  <div className="border-2 border-white px-8 py-4 mb-6 group-hover:border-cyan-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300">
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-500 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description - Shows on hover */}
                  <p className="text-gray-200 text-sm md:text-base mb-6 max-w-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {service.description}
                  </p>

                  {/* Learn More Button */}
                  <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-cyan-500 hover:text-white">
                    Learn More
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Services CTA */}
        <div className="text-center mt-12 scroll-animate fade-in">
          <Link
            to="/services"
            className="inline-flex items-center text-cyan-500 hover:text-cyan-400 font-semibold text-lg group"
          >
            View All Services
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicePreview;
