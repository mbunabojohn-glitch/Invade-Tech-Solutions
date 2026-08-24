import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/Home/About";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import Shop from "../pages/Shop/Shop";
import OrderForm from "../pages/Shop/OrderForm";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import CookiePolicy from "../pages/CookiePolicy";
import TechBuzz from "../pages/TechBuzz/TechBuzz";
import TechBuzzDetail from "../pages/TechBuzz/TechBuzzDetail";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/order" element={<OrderForm />} />
      <Route path="/tech-buzz" element={<TechBuzz />} />
      <Route path="/tech-buzz/:id" element={<TechBuzzDetail />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
