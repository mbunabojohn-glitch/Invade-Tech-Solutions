import { Target, Zap, CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const values = [
    {
      id: 1,
      title: "Excellence",
      description:
        "We do not compromise on quality and we do all we can to get it right the first time. Our commitment to excellence drives every solution we deliver.",
    },
    {
      id: 2,
      title: "Commitment",
      description:
        "Our dedication ensures we see it through to the end, with the intention of exceeding your expectation. We stand by our promises and deliverables.",
    },
    {
      id: 3,
      title: "Dependability",
      description:
        "Our commitment and dedication are resolute. We will deliver as we have promised. You can count on us to be there when you need us most.",
    },
  ];

  const expertise = [
    {
      id: 1,
      title: "Exposure",
      description:
        "We create and improve your online presence and digital infrastructure.",
    },
    {
      id: 2,
      title: "Efficiency",
      description:
        "We maximize your business productivity through optimized IT systems.",
    },
    {
      id: 3,
      title: "Expertise",
      description:
        "We leverage our vast knowledge base to proffer and implement solutions to your IT challenges.",
    },
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

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section with Background Image */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/about/circuit-board-hero.jpg"
            alt="Technology Background"
            className="w-full h-full object-cover opacity-150"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            style={{ animation: "fade-in-up 0.6s ease-out" }}
          >
            About Us
          </h1>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Text Content */}
            <div className="scroll-animate slide-right">
              <div className="mb-4">
                <span className="text-cyan-500 text-sm font-semibold tracking-widest uppercase">
                  ABOUT
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
                  Company <span className="text-cyan-500">Overview</span>
                </h2>
              </div>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  We are an IT Services and Consulting Company dedicated to
                  helping businesses leverage technology to grow and operate
                  efficiently.
                </p>
                <p>
                  We provide reliable IT Solutions, experts consulting and
                  technical support tailored to meet the unique needs of each
                  client. Let's build Smarter, Stronger, and more efficient
                  Systems together.
                </p>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative scroll-animate slide-left">
              <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-800">
                <img
                  src="/images/about/technician-working.jpg"
                  alt="IT Support Professional"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Values Content */}
            <div className="scroll-animate slide-right">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Our <span className="text-cyan-500">Values</span>
                </h2>
              </div>
              <p className="text-gray-300 text-lg mb-8">
                Excellence, Commitment and Dependability are the very core of
                Invade Tech Solutions and a key element of our vision and way of
                doing business.
              </p>

              <div className="space-y-6">
                {values.map((value) => (
                  <div key={value.id}>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {value.title}:
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative lg:mt-12 scroll-animate slide-left">
              <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-800">
                <img
                  src="/images/about/server-room.jpg"
                  alt="Network Infrastructure"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Bring To The Table Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="relative order-2 lg:order-1 scroll-animate slide-right">
              <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-800">
                <img
                  src="/images/cybersecurity.jpg"
                  alt="IT Professional"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="order-1 lg:order-2 scroll-animate slide-left">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  What We{" "}
                  <span className="text-cyan-500">Bring To The Table</span>
                </h2>
              </div>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                The wealth of experience brought by the network of each member
                of our management team coupled with a relentless effort to solve
                existing challenges says we are more than capable to take on
                seemingly unattainable tasks. From mobile and web applications
                to custom applications and business productivity solutions,
                Invade Tech Solutions will design, develop and support custom IT
                solutions to meet your business needs.
              </p>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                With a business practice that constitutes 70% service and
                after-sales support and 30% product, we help businesses succeed
                using our{" "}
                <span className="text-cyan-500 font-semibold">
                  3E principle
                </span>
                :
              </p>

              <div className="space-y-4">
                {expertise.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                    <div>
                      <span className="text-white font-semibold text-lg">
                        {item.title}
                      </span>
                      <span className="text-gray-400">
                        {" "}
                        – {item.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-gray-300 text-lg mt-8 leading-relaxed">
                These have led to the growth of our clientele base hereby
                exceeding the offerings of our competitors and the expectation
                of our clients while adhering strictly to our client's
                specifications. We have a national presence in over 25 states in
                Nigeria. Our team possesses the industry's highest achievable
                accreditations, which means our customers can focus on running
                their business, not on managing their hardware.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 scroll-animate fade-in">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-cyan-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                To deliver world-class IT solutions that empower businesses to
                achieve their goals, enhance productivity, and maintain a
                competitive edge in the digital landscape.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 scroll-animate fade-in">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-cyan-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                To be the most trusted IT partner in Nigeria and beyond,
                recognized for our innovation, expertise, and unwavering
                commitment to client success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-animate scale-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your IT Infrastructure?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can help your business thrive with cutting-edge
            technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/contact")}
              className="bg-cyan-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="bg-transparent border-2 border-cyan-500 text-cyan-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
