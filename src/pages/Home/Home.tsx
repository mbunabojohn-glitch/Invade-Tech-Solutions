import Hero from "./Hero";
import Stats from "./Stats";
import ServicePreview from "./ServicePreview";
import Clients from "./Clients";
import TechBuzz from "../../components/TechBuzz";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <ServicePreview />
      <TechBuzz />
      <Clients />
    </div>
  );
};

export default Home;
