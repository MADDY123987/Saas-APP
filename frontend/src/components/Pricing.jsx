import { plans } from "../assets/assets.js";

const Pricing = () => {
  return (
    <div className="py-16 px-6">
      <h2 className="text-center text-main text-4xl font-extrabold mb-4">
        Choose your perfect plan ✨
      </h2>
      <p className="text-center text-muted max-w-xl mx-auto mb-14">
        Currently completely FREE! 🎉
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.id} className="custom-card p-8 rounded-3xl relative text-center">
            <h3 className="text-xl text-main font-bold">{plan.name}</h3>
            <p className="text-[var(--brand-primary)] font-extrabold text-4xl mt-3 mb-6">
              ₹0
            </p>
            <p className="text-muted">Free Unlimited Usage</p>

            <button className="custom-btn w-full py-3 rounded-full text-white mt-8 cursor-not-allowed opacity-50">
              Free Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
