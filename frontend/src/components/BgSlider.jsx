import { useState } from "react";
import { assets, categories } from "../assets/assets.js";

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeCategory, setActiveCategory] = useState("People");

  return (
    <div className="mb-24 relative">
      <h2 className="text-4xl font-extrabold text-center text-main mb-14">
        Stunning Quality ✨
      </h2>

      {/* Category Selector */}
      <div className="flex justify-center mb-10">
        <div className="flex bg-[var(--card-bg)] px-4 py-3 rounded-full shadow-lg gap-3 backdrop-blur-xl">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full transition-all font-medium ${
                activeCategory === category
                  ? "bg-[var(--brand-primary)] text-white shadow-lg scale-105"
                  : "text-muted hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Image Comparison Wrapper */}
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl 
        bg-[rgba(255,255,255,0.04)] backdrop-blur-xl shadow-[0_0_45px_rgba(128,0,255,0.25)]">

        {/* Before Image */}
        <img
          src={assets.people_org}
          alt="Before"
          className="w-full select-none pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        />

        {/* After Image */}
        <img
          src={assets.people}
          alt="After"
          className="absolute top-0 w-full h-full select-none pointer-events-none"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        />

        {/* Draggable Slider Handle */}
        <input
          type="range"
          className="absolute top-1/2 -translate-y-1/2 w-full z-20 appearance-none cursor-pointer
                    bg-transparent"
          min={0}
          max={100}
          value={sliderPosition}
          onChange={(e) => setSliderPosition(e.target.value)}
        />

        {/* Custom thumb styling */}
        <div
          className="absolute top-1/2 -translate-y-1/2 z-30 h-10 w-10 
                    bg-white rounded-full shadow-[0_0_20px_var(--brand-primary)]
                    border-2 border-[var(--brand-primary)]
                    flex items-center justify-center pointer-events-none transition-all"
          style={{ left: `calc(${sliderPosition}% - 20px)` }}
        >
          <span className="text-[var(--brand-primary)] font-bold text-lg">⇆</span>
        </div>
      </div>
    </div>
  );
};

export default BgSlider;
