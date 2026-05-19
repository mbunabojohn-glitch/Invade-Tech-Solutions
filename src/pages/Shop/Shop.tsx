import React, { useEffect } from 'react';
import { 
  Zap, 
  Sun, 
  Settings, 
  Tv, 
  Laptop, 
  Wifi, 
  Fan, 
  Gamepad2, 
  Refrigerator, 
  AlertTriangle, 
  Truck, 
  ShieldCheck,
  Users,
  Lightbulb,
  Radio
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Shop: React.FC = () => {
  const navigate = useNavigate();

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

  const navigateToOrder = () => {
    navigate('/shop/order');
  };

  const appliances = [
    { name: 'LED Bulb', power: '10W', runtime: '80–90 hrs', icon: <Lightbulb className="w-6 h-6" /> },
    { name: '43" Smart TV', power: '70–90W', runtime: '9–12 hrs', icon: <Tv className="w-6 h-6" /> },
    { name: '55" Smart TV', power: '100–120W', runtime: '7–9 hrs', icon: <Tv className="w-6 h-6" /> },
    { name: 'Laptop', power: '60–65W', runtime: '12–14 hrs', icon: <Laptop className="w-6 h-6" /> },
    { name: 'WiFi Router', power: '10–15W', runtime: '50–70 hrs', icon: <Wifi className="w-6 h-6" /> },
    { name: 'Starlink Router', power: '45W', runtime: '18–20 hrs', icon: <Radio className="w-6 h-6" /> },
    { name: 'Standing Fan', power: '60–75W', runtime: '8–12 hrs', icon: <Fan className="w-6 h-6" /> },
    { name: 'PS5 Console', power: '160–200W', runtime: '4–5 hrs', icon: <Gamepad2 className="w-6 h-6" /> },
    { name: 'Inverter Freezer', power: '140–150W', runtime: '5–6 hrs', icon: <Refrigerator className="w-6 h-6" /> },
  ];

  const warnings = [
    'Air Conditioners',
    'Electric Kettles',
    'Microwaves',
    'Pressing Irons',
    'Large Refrigerators'
  ];

  return (
    <div className="bg-[#020d1f] text-white min-h-screen font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Section 1 — Hero */}
      <section className="relative pt-8 pb-12 px-4 overflow-hidden flex flex-col items-center text-center">
        {/* Top Banner */}
        <p className="text-cyan-400 font-semibold mb-4 scroll-animate fade-in">
          Never be caught off-guard again!
        </p>

        {/* Headline */}
        <div className="relative mb-4 scroll-animate slide-right">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight relative z-10 text-white">
            <span className="text-cyan-500">Take Control</span> of Your Power
          </h1>
        </div>

        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed scroll-animate slide-left">
          Keep your devices running anytime, with reliable power supply you can trust!
        </p>

        {/* Order Now Button */}
        <button 
          onClick={navigateToOrder}
          className="bg-cyan-500 text-white px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] hover:scale-105 transition-all mb-12 group relative overflow-hidden scroll-animate scale-in"
        >
          <span className="relative z-10">Order Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>

        {/* Product Image and Floating Badges */}
        <div className="relative w-full max-w-5xl mx-auto flex justify-center items-center py-8 scroll-animate fade-in">
          {/* Floating Badges - Left */}
          <div className="absolute left-[-20px] xl:left-0 top-1/4 hidden lg:flex flex-col gap-16 z-20">
            <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-4 rounded-xl flex items-center gap-3 animate-float shadow-2xl" style={{animationDelay: '0s'}}>
              <div className="bg-cyan-500/20 p-2.5 rounded-lg"><Zap className="w-6 h-6 text-cyan-400" /></div>
              <div className="text-left">
                <p className="text-base font-bold">Plug & Play</p>
              </div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-4 rounded-xl flex items-center gap-3 animate-float shadow-2xl" style={{animationDelay: '1s'}}>
              <div className="bg-orange-500/20 p-2.5 rounded-lg"><Zap className="w-6 h-6 text-orange-400" /></div>
              <div className="text-left">
                <p className="text-base font-bold">2hrs Fast Charge</p>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative z-10 group px-4">
            <div className="absolute -inset-6 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-colors"></div>
            <img 
              src="/images/hero-solar.webp" 
              alt="Itel Power Inverter" 
              className="relative w-full max-w-md drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] animate-rotate-y-slow brightness-110 contrast-105"
            />
          </div>

          {/* Floating Badges - Right */}
          <div className="absolute right-[-20px] xl:right-0 top-1/4 hidden lg:flex flex-col gap-16 z-20">
            <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-4 rounded-xl flex items-center gap-3 animate-float shadow-2xl" style={{animationDelay: '0.5s'}}>
              <div className="bg-yellow-500/20 p-2.5 rounded-lg"><Sun className="w-6 h-6 text-yellow-400" /></div>
              <div className="text-left">
                <p className="text-base font-bold max-w-[180px]">Battery + Inverter + Solar in one</p>
              </div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-4 rounded-xl flex items-center gap-3 animate-float shadow-2xl" style={{animationDelay: '1.5s'}}>
              <div className="bg-purple-500/20 p-2.5 rounded-lg"><Settings className="w-6 h-6 text-purple-400" /></div>
              <div className="text-left">
                <p className="text-base font-bold">Simple Setup</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-8 flex items-center gap-4 bg-slate-900/40 px-6 py-3 rounded-full border border-slate-800 animate-fade-in">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-8 h-8 rounded-full border-2 border-slate-900" />
            ))}
          </div>
          <p className="text-sm font-bold text-slate-300">
            <Users className="w-4 h-4 inline mr-2 text-cyan-400" />
            1,000+ Units sold
          </p>
        </div>
      </section>

      {/* Section 2 — What It Can Power */}
      <section className="py-20 bg-slate-900/30 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See How Long It Powers Your Devices</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appliances.map((app, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/50 transition-colors group scroll-animate scale-in">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-slate-800 rounded-xl text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    {app.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{app.name}</h3>
                    <p className="text-slate-500 text-sm">Power Usage: {app.power}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                  <span className="text-slate-400 text-sm">Runtime</span>
                  <span className="text-cyan-400 font-bold">{app.runtime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Warning */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 scroll-animate slide-right">
            <img 
              src="/images/power-tank.webp" 
              alt="Safety Warning"
              className="w-full h-[500px] object-cover rounded-2xl brightness-110 contrast-105"
            />
          </div>
          <div className="order-1 md:order-2 scroll-animate slide-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">With Great Power Comes Responsibility!</h2>
            <div className="space-y-4 mb-8">
              {warnings.map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-300">
                  <div className="bg-red-500/10 p-1 rounded">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-yellow-500/10 border-l-4 border-yellow-500 rounded-r-lg">
              <p className="text-yellow-500 font-medium">
                Note: Heavy appliances may trigger overload protection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Human Touch */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/living room.jpg" 
            alt="Lifestyle"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 scroll-animate scale-in bg-slate-950/40 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
            When National Grid Fall, <br />
            <span className="text-cyan-400">Your Power Go Get Back Up!</span>
          </h2>
          <p className="text-xl md:text-2xl text-white italic font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
            "No more 'Up NEPA' heartbreaks. Stay connected, stay productive, and keep the vibes going 24/7."
          </p>
        </div>
      </section>

      {/* Section 5 — Offer */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 scroll-animate fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">We've Power-Packed the Best Deal for You</h2>
          </div>

          <div className="bg-slate-900 border-2 border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl scroll-animate scale-in">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <div className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-bold mb-6">
                  + 200W Sonik Energy Saving Iron — FREE
                </div>
                <h3 className="text-3xl font-bold mb-4">Itel 500W Solar Tank Inverter</h3>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-5xl font-black text-white">₦350,000</span>
                  <span className="text-slate-500 line-through text-xl">₦450,000</span>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-cyan-400" />
                    <span className="font-medium text-lg">2 Years Warranty</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Settings className="w-6 h-6 text-cyan-400" />
                    <span className="font-medium text-lg">Free Installation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-6 h-6 text-cyan-400" />
                    <span className="font-medium text-lg">Payment on Delivery</span>
                  </div>
                </div>

                <button 
                  onClick={navigateToOrder}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-5 rounded-2xl text-xl transition-all shadow-lg hover:shadow-cyan-500/20"
                >
                  Claim This Offer Now
                </button>
              </div>
              <div className="bg-slate-800/50 flex items-center justify-center p-8">
                <img 
                  src="/images/sec5.jpg" 
                  alt="Bundle Offer"
                  className="w-full max-w-sm drop-shadow-2xl rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-slate-900 text-center">
        <p className="text-slate-500">© 2026 Invade Tech Solution. All rights reserved.</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap');
        
        .font-handwriting {
          font-family: 'Gochi Hand', cursive;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes draw {
          from { stroke-dasharray: 0, 1000; }
          to { stroke-dasharray: 1000, 1000; }
        }
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 0;
          animation: draw 2s ease-out forwards;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Shop;
