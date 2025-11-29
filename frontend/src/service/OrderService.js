import axios from "axios";
import toast from "react-hot-toast";

export const placeOrder = async ({ planId, getToken, onSuccess, backendUrl }) => {
  try {
    toast.loading("Creating order…");
    const token = await getToken();

    const response = await axios.post(
      `${backendUrl}/orders?planId=${planId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.dismiss();

    if (response.data.success) {
      toast.success("Order created! opening payment gateway…");
      initializePayment({ order: response.data.data, getToken, onSuccess, backendUrl });
    } else {
      toast.error("Unable to create order!");
    }

  } catch (err) {
    toast.dismiss();
    toast.error("Payment failed! Try again 🙏");
  }
};

const initializePayment = ({ order, getToken, onSuccess, backendUrl }) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: "INR",
    name: "remove.bg AI",
    description: "Unlock more credits 🎯",
    image: "/logo.png",
    order_id: order.id,

    theme: {
      color: "#7C3AED"
    },

    handler: async (paymentDetails) => {
      try {
        toast.loading("Verifying payment… 🔐");
        const token = await getToken();

        const response = await axios.post(
          `${backendUrl}/orders/verify`,
          paymentDetails,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.dismiss();

        if (response.data.success) {
          toast.success("Credits added successfully 🎉");
          onSuccess?.();
        } else {
          toast.error("Verification failed!");
        }

      } catch {
        toast.dismiss();
        toast.error("Payment verification error!");
      }
    },

    modal: {
      ondismiss: () => {
        toast.error("Payment cancelled");
      }
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
