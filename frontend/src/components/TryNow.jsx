import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";

const TryNow = () => {
  const { removeBg } = useContext(AppContext);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    removeBg(e.dataTransfer.files[0]);
  };

  return (
    <div className="flex flex-col items-center py-24 px-6">
      
      <h2 className="text-main text-4xl font-extrabold text-center mb-4">
        Remove Image Background
      </h2>
      <p className="text-muted mb-8">
        Upload or drop any photo, our AI will remove the background instantly 💥
      </p>

      {/* Upload Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`custom-card border-2 border-dashed cursor-pointer rounded-2xl p-10 text-center transition
        ${isDragging ? "border-[var(--brand-primary)] shadow-xl scale-[1.05]" : "border-gray-500/30"}`}
      >
        <input hidden id="upload2" type="file" accept="image/*"
               onChange={(e) => removeBg(e.target.files[0])} />

        <label htmlFor="upload2" className="custom-btn px-8 py-3 rounded-full text-white text-lg">
          Upload Image
        </label>

        <p className="text-muted text-sm mt-3">
          or drag and drop here ⬇️
        </p>
      </div>

    </div>
  );
};

export default TryNow;
