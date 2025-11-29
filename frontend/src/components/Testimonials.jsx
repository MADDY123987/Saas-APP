import { testimonials } from "../assets/assets.js";
import { useEffect } from "react";

const Testimonials = () => {

  useEffect(() => {
    const cards = document.querySelectorAll(".testimonial-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("opacity-100", "translate-y-0");
      }, index * 200);
    });
  }, []);

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-center text-main text-4xl font-extrabold mb-14">
        They love us 💜 You will too.
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="testimonial-card opacity-0 translate-y-10 transition-all duration-700
            custom-card p-7 rounded-2xl flex flex-col justify-between cursor-pointer
            hover:scale-[1.03]"
          >

            <svg className="text-[var(--brand-primary)] w-8 mb-4" viewBox="0 0 512 512">
              <path d="M464 64H48C21.5..." fill="currentColor"></path>
            </svg>

            <p className="text-muted mb-8 leading-relaxed text-base">
              {test.quote}
            </p>

            <div className="flex gap-3 items-center">
              <img
                src={test.image}
                alt="user"
                className="rounded-full w-11 h-11 object-cover shadow-lg"
              />
              <div>
                <p className="text-main font-semibold">{test.author}</p>
                <span className="text-muted text-sm">{test.handle}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
