import Hero from "./Hero";
import Stats from "./Stats";
import ServicePreview from "./ServicePreview";
import Clients from "./Clients";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <ServicePreview />
      <Clients />
    </div>
  );
};

export default Home;
