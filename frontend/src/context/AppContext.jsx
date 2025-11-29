import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [credit] = useState(9999);
  const [image, setImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateFile = (file) => {
    if (!file) return false;
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Please upload a valid image!");
      return false;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Max size 8MB");
      return false;
    }
    return true;
  };

  const removeBg = async (selectedImage) => {
    if (!validateFile(selectedImage)) return;

    setImage(selectedImage);
    setResultImage(null);
    navigate("/result");

    setLoading(true);
    const loadingToast = toast.loading("Removing background…");

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const res = await axios.post(
        backendUrl + "/api/images/remove-background",
        formData
      );

      const base64 = "data:image/png;base64," + res.data;
      setResultImage(base64);

      toast.success("Done! 🎉");
    } catch (error) {
      toast.error("Failed!");
      console.error(error);
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        credit,
        image,
        resultImage,
        backendUrl,
        removeBg,
        loading,
        setImage,
        setResultImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
