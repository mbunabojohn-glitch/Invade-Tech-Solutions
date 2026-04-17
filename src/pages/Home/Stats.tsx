import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface StatItem {
  id: number;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

const Stats = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const handlePartnerClick = () => {
    navigate("/contact", {
      state: {
        service: "Partnership Opportunity",
        message:
          "I'm interested in partnering with Invade Tech Solutions after reviewing your track record.",
        source: "track-record-section",
      },
    });
  };

  const stats: StatItem[] = [
    { id: 1, label: "Years of Excellence", value: 6, suffix: "+", prefix: "" },
    { id: 2, label: "Satisfied Clients", value: 500, suffix: "+", prefix: "" },
    {
      id: 3,
      label: "Projects Completed",
      value: 1200,
      suffix: "+",
      prefix: "",
    },
    { id: 4, label: "System Uptime", value: 99.9, suffix: "%", prefix: "" },
  ];

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

  // Trigger counter animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const AnimatedCounter = ({
    value,
    suffix,
    prefix = "",
  }: {
    value: number;
    suffix: string;
    prefix?: string;
  }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 3500;
      const steps = 80;
      const increment = value / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setCount(Math.min(increment * currentStep, value));
        } else {
          clearInterval(timer);
          setCount(value);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [value]); // Only depend on value

    return (
      <span className="text-5xl md:text-6xl font-bold text-cyan-500">
        {prefix}
        {value === 99.9 ? count.toFixed(1) : Math.floor(count)}
        {suffix}
      </span>
    );
  };

  return (
    <section className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Track Record
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Numbers that speak to our commitment to excellence and client
            satisfaction
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-gray-950 border border-gray-800 rounded-lg p-8 text-center transform transition-all duration-500 hover:scale-105 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 scroll-animate fade-in"
            >
              <div className="mb-4">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>
              <p className="text-gray-300 text-lg font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 scroll-animate scale-in">
          <p className="text-gray-400 text-lg mb-6">
            Join hundreds of businesses who trust us with their IT
            infrastructure
          </p>
          <button
            onClick={handlePartnerClick}
            className="bg-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            Partner With Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Stats;
