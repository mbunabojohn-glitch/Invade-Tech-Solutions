import Hero from "./Hero";
import Stats from "./Stats";
import ServicePreview from "./ServicePreview";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <ServicePreview />
    </div>
  );
};

export default Home;
