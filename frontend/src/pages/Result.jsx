import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const { image, resultImage } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center py-16 min-h-[85vh] text-main">
      <div className="max-w-5xl w-full bg-[var(--card-bg)] backdrop-blur-xl
      rounded-2xl p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-center mb-8">Result Preview</h2>

        {/* Side-by-Side grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Original */}
          <div>
            <p className="font-semibold mb-2 text-center">Original</p>
            <div className="rounded-xl bg-black/20 h-[350px] flex items-center justify-center overflow-hidden">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <p className="text-muted">No image selected</p>
              )}
            </div>
          </div>

          {/* Result */}
          <div>
            <p className="font-semibold mb-2 text-center">Background Removed</p>
            <div className="rounded-xl bg-black/10 h-[350px] flex items-center justify-center overflow-hidden relative">
              {resultImage ? (
                <img
                  src={resultImage}
                  className="max-h-full max-w-full object-contain animate-fade animate-zoom"
                />
              ) : image ? (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
                  <p className="absolute bottom-3 text-muted text-sm">Processing…</p>
                </>
              ) : (
                <p className="text-muted">No result yet</p>
              )}
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            className="border border-[var(--brand-primary)] text-[var(--brand-primary)]
            px-6 py-2 rounded-full hover:bg-[var(--brand-primary)] hover:text-white transition"
            onClick={() => navigate("/")}
          >
            Try another image
          </button>

          {resultImage && (
            <a
              href={resultImage}
              download="EraseX-output.png"
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white
              px-7 py-2 rounded-full shadow-lg hover:scale-105 transition"
            >
              Download
            </a>
          )}
        </div>

      </div>
    </div>
  );
};

export default Result;
