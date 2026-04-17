import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "../../components/ContactForm";

interface ScrollAnimationState {
  [key: string]: boolean;
}

const Contact = () => {
  const location = useLocation();
  const prefilledData = location.state as {
    service?: string;
    message?: string;
    source?: string;
  } | null;
  const [animated, setAnimated] = useState<ScrollAnimationState>({});
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setAnimated((prev) => ({ ...prev, [id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (heroRef.current) {
      heroRef.current.id = "hero";
      observer.observe(heroRef.current);
    }
    if (cardsRef.current) {
      cardsRef.current.id = "cards";
      observer.observe(cardsRef.current);
    }
    if (formRef.current) {
      formRef.current.id = "form";
      observer.observe(formRef.current);
    }
    if (mapRef.current) {
      mapRef.current.id = "map";
      observer.observe(mapRef.current);
    }
    if (ctaRef.current) {
      ctaRef.current.id = "cta";
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      value: "Lagos, Nigeria",
      description: "Head Office",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+234 123 456 7890",
      description: "Available 9AM - 5PM",
    },
    {
      icon: Mail,
      title: "Email",
      value: "Admin@invadetechsolutionz.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon - Fri, 9AM - 5PM",
      description: "WAT (West Africa Time)",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`relative h-[60vh] flex items-center justify-center overflow-hidden transition-all duration-1000 ${
          animated.hero ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/Contact-Img.jpg"
            alt="Contact Background"
            className="w-full h-full object-cover opacity-150"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Let's Work Together
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? Get in touch with our team and let's create
            something amazing together.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <div
        ref={cardsRef}
        className={`transition-all duration-1000 ${
          animated.cards
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className="group p-6 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                    style={{
                      transitionDelay: animated.cards
                        ? `${index * 100}ms`
                        : "0ms",
                    }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors mb-4">
                      <Icon className="text-cyan-500" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    <p className="text-cyan-400 font-medium mb-1">
                      {info.value}
                    </p>
                    <p className="text-sm text-gray-400">{info.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form and Map Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div
              ref={formRef}
              className={`transition-all duration-1000 ${
                animated.form
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-8">
                <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
                <p className="text-gray-400 mb-8">
                  Fill out the form below and we'll get back to you shortly.
                </p>

                {prefilledData?.source === "track-record-section" && (
                  <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-4 mb-6 animate-in fade-in">
                    <p className="text-cyan-400">
                      💼 <strong>Partnership Inquiry</strong> - We're excited to
                      discuss collaboration opportunities with you!
                    </p>
                  </div>
                )}

                <ContactForm key={location.key} />
              </div>
            </div>

            {/* Map Section */}
            <div
              ref={mapRef}
              className={`transition-all duration-1000 ${
                animated.map
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="space-y-6">
                {/* Map */}
                <div className="rounded-xl overflow-hidden border border-gray-700 h-96">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=YOUR_CUSTOM_EMBED_CODE"
                    title="Invade Tech Solutions Location"
                  ></iframe>
                </div>

                {/* Info Card Overlay */}
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-4">
                    Office Location
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin
                        className="text-cyan-500 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <p className="font-medium">Lagos, Nigeria</p>
                        <p className="text-sm text-gray-400">
                          Our headquarters and main office
                        </p>
                      </div>
                    </div>
                    <hr className="border-gray-700" />
                    <div className="flex items-start space-x-3">
                      <Clock
                        className="text-cyan-500 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <p className="font-medium">Working Hours</p>
                        <p className="text-sm text-gray-400">
                          Monday - Friday: 9AM - 5PM WAT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        ref={ctaRef}
        className={`transition-all duration-1000 ${
          animated.cta ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-12">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Schedule a free consultation with one of our experts today.
              </p>
              <button
                onClick={() => {
                  const formElement = document.getElementById("contact-form");
                  formElement?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                Schedule a Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
