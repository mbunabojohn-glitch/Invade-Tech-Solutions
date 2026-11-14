import Hero from "./Hero";
import Stats from "./Stats";
import ServicePreview from "./ServicePreview";
import Clients from "./Clients";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <ServicePreview />
      <Clients />
      <Testimonials />
    </div>
  );
};

export default Home;
