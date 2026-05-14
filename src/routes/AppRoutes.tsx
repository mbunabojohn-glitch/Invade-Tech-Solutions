import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/Home/About";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import Career from "../pages/Career";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import CookiePolicy from "../pages/CookiePolicy";
import TechBuzz from "../pages/TechBuzz/TechBuzz";
import TechBuzzDetail from "../pages/TechBuzz/TechBuzzDetail";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register/Register";
import StudentLogin from "../pages/StudentPortal/Login/StudentLogin";
import StudentDashboardLayout from "../pages/StudentPortal/StudentDashboardLayout";
import StudentOverview from "../pages/StudentPortal/Dashboard/StudentOverview";
import { MyClasses } from "../pages/StudentPortal/Classes/MyClasses";
import { Webinars } from "../pages/StudentPortal/Webinars/Webinars";
import { Classroom } from "../pages/StudentPortal/Classroom/Classroom";
import { Resources } from "../pages/StudentPortal/Resources/Resources";
import { useAppStore } from "../store/useAppStore";

// Student Protected Route — redirects to login if not authenticated
function StudentProtectedRoute({ children }: { children: React.ReactNode }) {
  const isStudentAuthenticated = useAppStore((s) => s.isStudentAuthenticated);

  if (!isStudentAuthenticated) {
    return <Navigate to="/student/login" replace />;
  }

  return <>{children}</>;
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/career" element={<Career />} />
      <Route path="/tech-buzz" element={<TechBuzz />} />
      <Route path="/tech-buzz/:id" element={<TechBuzzDetail />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />

      {/* ── Student Portal Routes (nested under dashboard layout) ── */}
      <Route
        element={
          <StudentProtectedRoute>
            <StudentDashboardLayout />
          </StudentProtectedRoute>
        }
      >
        <Route path="/student/dashboard" element={<StudentOverview />} />
        <Route path="/student/classes" element={<MyClasses />} />
        <Route path="/student/webinars" element={<Webinars />} />
        <Route path="/student/classroom" element={<Classroom />} />
        <Route path="/student/resources" element={<Resources />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
