import { assets, FOOTER_CONSTANTS } from "../assets/assets.js";

const Footer = () => {
  return (
    <footer className="bg-[var(--card-bg)] backdrop-blur-xl text-main px-6 py-5
      flex flex-col md:flex-row items-center justify-between gap-4 shadow-inner"
    >
      {/* Logo + Brand Name */}
      <div className="flex items-center gap-3 hover:scale-[1.06] transition-all cursor-pointer">
        <video
          src="/remove_bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-12 w-12 rounded-full object-cover shadow-lg"
        />
        <span className="font-bold text-xl">
          remove<span className="text-[var(--brand-primary)]">background</span>
        </span>
      </div>

      {/* Copyright */}
      <p className="text-sm opacity-80 text-center">
        &copy; {new Date().getFullYear()} All rights reserved.
      </p>

      {/* Social Icons */}
      <div className="flex gap-4">
        {FOOTER_CONSTANTS.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 hover:brightness-125 transition duration-300"
          >
            <img src={item.logo} width={28} className="opacity-80 hover:opacity-100" />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
