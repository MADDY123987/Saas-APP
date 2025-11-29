import { assets } from "../assets/assets.js";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";

const Header = () => {
  const { removeBg } = useContext(AppContext);

  useEffect(() => {
    const text = document.querySelector(".typing");
    const words = ["background eraser", "AI photo editor", "smart bg remover"];
    let i = 0;
    let j = 0;
    let forward = true;

    const type = () => {
      const current = words[i];
      text.textContent = current.slice(0, j);

      if (forward) {
        j++;
        if (j > current.length) {
          forward = false;
          setTimeout(type, 900);
          return;
        }
      } else {
        j--;
        if (j === 0) {
          forward = true;
          i = (i + 1) % words.length;
        }
      }
      setTimeout(type, 120);
    };
    type();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">

      {/* Video */}
      <div className="order-2 md:order-1 flex justify-center">
        <div className="relative rounded-3xl overflow-hidden custom-card shadow-xl animate-float">
          <video
            src={assets.video_banner}
            autoPlay loop muted
            className="w-full max-w-[420px] object-cover"
          />
        </div>
      </div>

      {/* Text */}
      <div className="order-1 md:order-2">
        <h1 className="text-main text-4xl md:text-5xl font-extrabold mb-4">
          The fastest <span className="text-[var(--brand-primary)] typing"></span>
        </h1>

        <p className="text-muted mb-10 text-lg leading-relaxed">
          Upload your image and let our AI automatically remove the background with precision and speed.
        </p>

        <label
          htmlFor="upload1"
          className="custom-btn text-white px-8 py-4 rounded-full text-lg cursor-pointer"
        >
          Upload your image 🚀
        </label>
        <input
          type="file"
          accept="image/*"
          id="upload1"
          hidden
          onChange={(e) => removeBg(e.target.files[0])}
        />
      </div>
    </div>
  );
};

export default Header;
