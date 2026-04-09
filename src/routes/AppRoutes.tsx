// client/src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add other routes later */}
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/services" element={<Services />} /> */}
      {/* <Route path="/career" element={<Career />} /> */}
    </Routes>
  );
};

export default AppRoutes;
