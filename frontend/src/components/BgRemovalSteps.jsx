import { steps } from "../assets/assets.js";
import { useEffect } from "react";

const BgRemovalSteps = () => {

  // Smooth reveal animation on scroll
  useEffect(() => {
    const cards = document.querySelectorAll(".step-card");
    const reveal = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          card.classList.add("opacity-100", "translate-y-0");
        }
      });
    };
    window.addEventListener("scroll", reveal);
    reveal();
  }, []);

  return (
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-extrabold text-main mb-14">
        How to remove a background in seconds?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {steps.map((item, index) => (
          <div
            key={index}
            className="step-card bg-white/5 backdrop-blur-xl border border-white/10
            shadow-[0_0_30px_rgba(0,0,0,0.25)] rounded-2xl p-10
            opacity-0 translate-y-10 transition-all duration-700
            hover:shadow-[0_0_35px_var(--brand-primary)] hover:scale-[1.05]
            cursor-pointer"
          >

            {/* 🔥 NEW Step Badge */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 bg-[var(--brand-primary)]/20
              text-[var(--brand-primary)] font-bold px-6 py-2 rounded-full
              shadow-[0_0_12px_var(--brand-primary)] animate-pulse">
                <span className="bg-[var(--brand-primary)] text-white h-8 w-8 flex 
                items-center justify-center rounded-full text-sm shadow-lg">
                  {index + 1}
                </span>
                {item.step}
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>

            <p className="text-muted leading-relaxed text-base">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BgRemovalSteps;
