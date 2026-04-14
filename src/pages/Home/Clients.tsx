import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

const clients = [
  {
    id: "livespot360",
    name: "Livespot360",
    industry: "Marketing & Events",
    logo: "/images/livespot-Img.jpg",
  },
  {
    id: "standpoint-ng",
    name: "Standpoint ng",
    industry: "Digital Agency",
    logo: "/images/standpoint-Img.png",
  },
  {
    id: "intervene-k12",
    name: "Intervene K-12",
    industry: "Education Technology",
    logo: "/images/Intervene-Img.jpg",
  },
];

const Clients = () => {
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
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by <span className="text-cyan-500">Leading Organizations</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            We're proud to partner with innovative companies across various
            industries, delivering exceptional IT solutions and support.
          </p>
        </div>

        {/* Clients Grid with Logos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {clients.map((client, index) => (
            <div
              key={client.id}
              className="scroll-animate fade-in bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500 transition-all duration-500 group hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Logo/Image Header - Set to cover the layout */}
              <div className="h-56 overflow-hidden relative">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                  onError={(e) => {
                    // Fallback if logo doesn't exist
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = ` 
                         <div class="absolute inset-0 flex items-center justify-center bg-white/5"> 
                           <h3 class="text-2xl font-bold text-white group-hover:text-cyan-500 transition-colors duration-300"> 
                             ${client.name} 
                           </h3> 
                         </div> 
                       `;
                    }
                  }}
                />
                {/* Immersive overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-80" />
                
                {/* Badge on Image */}
                <div className="absolute bottom-4 left-6 flex items-center text-cyan-500">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="text-xs font-bold tracking-widest uppercase">
                    Partner
                  </span>
                </div>
              </div>

              {/* Client Info */}
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-500 transition-colors duration-300">
                    {client.name}
                  </h3>
                  <div className="w-12 h-1 bg-cyan-500 rounded-full mb-4 transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
                  <p className="text-gray-400 font-medium">
                    {client.industry}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-800/50">
                  <span className="text-sm text-gray-500 italic">
                    Trusted across the {client.industry} sector.
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="scroll-animate fade-in text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-8 border border-cyan-500/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-cyan-500 mb-2">3+</div>
              <div className="text-gray-300">Major Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-500 mb-2">100%</div>
              <div className="text-gray-300">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-500 mb-2">6+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
