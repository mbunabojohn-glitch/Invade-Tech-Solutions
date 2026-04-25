import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { services as staticServices } from "../../data/servicesData";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useServices } from "../../hooks/useApi";
import { getIconComponent, type Service as ApiService } from "../../lib/api";
import { type Service as StaticService } from "../../data/servicesData";

const Services = () => {
  const navigate = useNavigate();
  // Fetch services dynamically from API, but use staticServices as a fallback if the API fails or is loading
  const { data: dynamicServices } = useServices();

  // This handler passes specific state (the service name) to the Contact page
  // so the Contact form can pre-fill the dropdown and message area automatically
  const handleInquire = (serviceId: string, serviceTitle: string) => {
    navigate("/contact", {
      state: {
        service: serviceId,
        message: `I would like to inquire about ${serviceTitle}.`,
      },
    });
  };

  // Generic navigation to the Contact page without specific pre-fill data
  const handleGetStarted = () => {
    navigate("/contact");
  };

  // Ensure services is always an array to prevent crashes if API returns unexpected data
  // Only use dynamic services if they are complete (at least as many as static services)
  const services = Array.isArray(dynamicServices) && dynamicServices.length >= staticServices.length ? dynamicServices : staticServices;

  // Scroll animation setup using IntersectionObserver
  // This detects when elements with the 'scroll-animate' class enter the viewport
  // and adds an 'animate-in' class to trigger CSS animations
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
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/service-Img.jpg"
            alt="Services Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 scroll-animate fade-in-up"
          >
            Our <span className="text-cyan-500">Services</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 scroll-animate fade-in-up delay-100">
            We provide comprehensive IT solutions designed to empower your
            business, enhance productivity, and drive digital transformation.
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service: ApiService | StaticService, index: number) => {
              const Icon = typeof service.icon === 'string' 
                ? getIconComponent(service.icon) 
                : (service.icon as any);
              return (
                <div
                  key={service.id}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                >
                  {/* Image/Icon Side */}
                  <div className="w-full lg:w-1/2 scroll-animate fade-in">
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-cyan-500/20 rounded-xl blur-xl group-hover:bg-cyan-500/30 transition-all duration-500"></div>
                      <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl">
                        {service.image ? (
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                            <Icon className="w-32 h-32 text-cyan-500 opacity-50" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 space-y-6 scroll-animate fade-in">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-sm font-medium">
                      <Icon className="w-4 h-4" />
                      <span>{('shortTitle' in service) ? service.shortTitle : `Service ${index + 1}`}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {service.features && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        {service.features.map((feature: string, fIndex: number) => (
                          <div key={fIndex} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-8">
                      <button
                        onClick={() => handleInquire(service.id, service.title)}
                        className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
                      >
                        <span>Inquire about this Service</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 
        CTA Section: Bottom of the page encouragement to contact the company
        - bg-gray-950: Slightly darker background than the rest of the page for contrast
      */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 text-center scroll-animate fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your IT Infrastructure?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Contact us today for a consultation and let us help you build 
            a more efficient and secure business environment.
          </p>
          {/* 
            Get Started Button: 
            - inline-flex: Allows text-center on parent to center the button
            - space-x-2: Space between text and icon
          */}
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;
