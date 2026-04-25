import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Users, Star, Coffee, ShieldCheck, MapPin, Clock, ArrowRight } from "lucide-react";

const Career = () => {
  const navigate = useNavigate();

  // Handler for Apply Now buttons
  const handleApplyNow = (jobTitle: string) => {
    navigate("/contact", {
      state: {
        service: "career-application",
        jobTitle: jobTitle,
        message: `I would like to apply for the ${jobTitle} position.`,
      },
    });
  };

  // Handler for Spontaneous Application
  const handleSpontaneousApplication = () => {
    navigate("/contact", {
      state: {
        service: "career-application",
        jobTitle: "Spontaneous Application",
        message:
          "I am interested in opportunities at Invade Tech Solutions and would like to submit my CV for consideration.",
      },
    });
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

    // Observe all elements with scroll-animate class
    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: Users,
      title: "Great Culture",
      description: "Join a diverse team of professionals who are passionate about technology and innovation."
    },
    {
      icon: Star,
      title: "Growth Opportunities",
      description: "We invest in our people through continuous training, certifications, and career development."
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "We believe in productivity over presence and support a healthy work-life balance."
    },
    {
      icon: ShieldCheck,
      title: "Comprehensive Benefits",
      description: "Competitive compensation packages and comprehensive health and wellness benefits."
    }
  ];

  const jobs = [
    {
      title: "Senior Network Engineer",
      department: "Infrastructure",
      location: "Lagos, Nigeria",
      type: "Full-time"
    },
    {
      title: "IT Support Technician",
      department: "Support",
      location: "Remote / Hybrid",
      type: "Full-time"
    },
    {
      title: "Hardware Procurement Specialist",
      department: "Procurement",
      location: "Lagos, Nigeria",
      type: "Contract"
    },
    {
      title: "Technical Trainer",
      department: "Training",
      location: "Lagos, Nigeria",
      type: "Part-time"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/career-Img.jpg"
            alt="Career Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 scroll-animate fade-in-up">
            Join Our <span className="text-cyan-500">Team</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 scroll-animate fade-in-up delay-100">
            Shape the future of IT with us. We're looking for passionate
            individuals who want to make a real impact in the world of
            technology.
          </p>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-animate fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Work at <span className="text-cyan-500">Invade Tech Solutions</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We offer more than just a job. We provide a platform for you to grow, 
              innovate, and excel in your professional journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-gray-800/40 p-8 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group scroll-animate fade-in"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-cyan-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 scroll-animate fade-in">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Current <span className="text-cyan-500">Openings</span>
              </h2>
              <p className="text-gray-400">
                Explore our latest job opportunities and find your perfect role.
              </p>
            </div>
            <div className="inline-flex items-center space-x-2 text-cyan-500 font-semibold">
              <Briefcase className="w-5 h-5" />
              <span>{jobs.length} Open Positions</span>
            </div>
          </div>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <div 
                key={index} 
                className="bg-gray-800/30 p-6 md:p-8 rounded-2xl border border-gray-700 hover:border-cyan-500/30 hover:bg-gray-800/50 transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-6 scroll-animate fade-in"
              >
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-500 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleApplyNow(job.title)}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 hover:shadow-lg hover:shadow-cyan-500/50"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spontaneous Application CTA */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 text-center scroll-animate fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Don't see a role that fits?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            We're always on the lookout for exceptional talent. Send us your CV 
            and we'll keep you in mind for future openings.
          </p>
          <button
            onClick={handleSpontaneousApplication}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
          >
            Send Spontaneous Application
          </button>
        </div>
      </section>
    </div>
  );
};

export default Career;
