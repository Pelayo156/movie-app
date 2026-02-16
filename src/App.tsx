import { Outlet } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
