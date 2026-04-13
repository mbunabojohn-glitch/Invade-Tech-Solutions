import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/Home/About";
import Contact from "../pages/Contact";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      {/* Placeholder routes - to be built later */}
      <Route
        path="/services"
        element={
          <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-2xl">
            Services Page - Coming Soon
          </div>
        }
      />
      <Route
        path="/career"
        element={
          <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-2xl">
            Career Page - Coming Soon
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
