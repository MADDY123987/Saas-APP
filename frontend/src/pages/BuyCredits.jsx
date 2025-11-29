import { useAuth, useClerk } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { placeOrder } from "../service/OrderService.js";
import { plans } from "../assets/assets.js";

const BuyCredits = () => {
  const { isSignedIn, getToken } = useAuth();
  const { openSignIn } = useClerk();
  const { loadUserCredits, backendUrl } = useContext(AppContext);

  const handleOrder = (planId) => {
    if (!isSignedIn) return openSignIn();

    placeOrder({
      planId,
      getToken,
      onSuccess: () => {
        loadUserCredits();
      },
      backendUrl,
    });
  };

  return (
    <section className="py-20 px-5">
      <h2 className="text-center text-main font-extrabold text-4xl mb-5">
        Upgrade your power ✨
      </h2>
      <p className="text-center text-muted max-w-xl mx-auto mb-16">
        Buy credits and unlock unlimited design creativity!
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {plans.map((p) => (
          <div
            key={p.id}
            className="custom-card rounded-3xl p-10 text-center cursor-pointer hover:-translate-y-3 hover:scale-[1.03] transition-all duration-300"
          >
            {p.popular && (
              <p className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--brand-primary)]
              text-white text-xs px-4 py-1 rounded-full shadow-lg animate-pulse">
                ⭐ MOST POPULAR
              </p>
            )}

            <h3 className="text-main font-bold text-2xl mb-3">{p.name}</h3>
            <p className="text-[var(--brand-primary)] font-extrabold text-4xl">
              ₹{p.price}
            </p>

            <p className="text-muted mt-6 mb-2">{p.credits}</p>
            <p className="text-muted mb-10">{p.description}</p>

            <button
              onClick={() => handleOrder(p.id)}
              className="custom-btn w-full py-3 rounded-full font-semibold text-white hover:scale-110 transition"
            >
              Buy Now 🚀
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuyCredits;
