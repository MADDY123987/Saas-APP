import Menubar from "./components/Menubar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Result from "./pages/Result.jsx";
import Pricing from "./components/Pricing.jsx";

const App = () => {
  return (
    <div>
      <Menubar />
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/result" element={<Result />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
