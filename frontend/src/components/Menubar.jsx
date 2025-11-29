import { assets } from "../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Menubar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[var(--card-bg)] backdrop-blur-lg shadow-lg
    flex justify-between items-center px-8 py-4 transition-all">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 hover:scale-[1.06] transition-all">
        <video
          src="/remove_bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-14 w-14 rounded-full object-cover shadow-lg"
        />
        <span className="text-main text-3xl font-extrabold tracking-tight">
          Erase<span className="text-[var(--brand-primary)]">X</span>
        </span>
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-6">
        <button className="text-main text-sm opacity-60 cursor-default">Free forever 🎉</button>
        <button onClick={toggleTheme} className="text-main text-xl">
          🌓
        </button>
      </div>

      {/* Mobile */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X /> : <Menu />}
      </button>

      {menuOpen && (
        <div className="absolute top-16 right-4 custom-card p-4 rounded-xl flex flex-col gap-4 w-40">
          <button onClick={toggleTheme} className="text-main text-lg">
            🌓 Theme
          </button>
        </div>
      )}
    </nav>
  );
};

export default Menubar;
