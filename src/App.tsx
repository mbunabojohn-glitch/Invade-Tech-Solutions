import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
