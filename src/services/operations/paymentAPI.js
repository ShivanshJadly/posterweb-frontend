import { toast } from "react-hot-toast";
import { removePurchasedPosters } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/posterSlice";
import { apiConnector } from "../apiConnector";
import { paymentEndpointsV2 } from "../apis";

const {
  POSTER_PAYMENT_API,
  POSTER_VERIFY_API,
} = paymentEndpointsV2;

// Load Razorpay SDK
async function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK.");
      reject(new Error("Failed to load Razorpay SDK"));
    };
    document.body.appendChild(script);
  });
}

// Buy Poster and Trigger Razorpay Payment
export async function BuyPoster(token, amount, posterDetails, userDetails, shippingAddress, paymentMethod, navigate, dispatch) {
  try {
    const isScriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!isScriptLoaded) {
      throw new Error("Razorpay SDK loading failed.");
    }

    const orderResponse = await apiConnector(
      "POST",
      POSTER_PAYMENT_API,
      { amount },
      { Authorization: `Bearer ${token}` }
    );

    if (!orderResponse?.data?.success) {
      throw new Error(orderResponse?.data?.message || "Payment initiation failed.");
    }

    const { amount: orderAmount, currency, id: orderId } = orderResponse.data.data;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency,
      amount: `${orderAmount}`,
      order_id: orderId,
      name: "PosterWeb",
      description: "Thank you for purchasing the poster.",
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },
      handler: async (response) => {
        const toastId = toast.loading("Processing payment...");
        await verifyPayment(response, amount, token, navigate, dispatch, posterDetails, shippingAddress, paymentMethod);
        toast.dismiss(toastId);
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", (response) => {
      console.error("Payment Failed:", response.error);
      toast.error("Payment failed. Please try again.");
    });

  } catch (error) {
    console.error("BuyPoster Error:", error);
    toast.error(error.message || "Could not complete payment.");
  }
}

// Verify Payment and Place Order
export async function verifyPayment(paymentData, amount, token, navigate, dispatch, posterDetails, shippingAddress, paymentMethod) {
  dispatch(setPaymentLoading(true));

  try {
    const orderItems = posterDetails.map((item) => ({
      posterId: item.posterId,
      quantity: item.quantity,
      size: item.size,
    }));

    const response = await apiConnector(
      "POST",
      POSTER_VERIFY_API,
      {
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature: paymentData.razorpay_signature,
        amount,
        orderItems,
        shippingAddress: shippingAddress._id,
        paymentMethod,
      },
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Payment verification failed.");
    }

    toast.success("Payment Successful! Order placed.");

    const purchasedPosterIds = posterDetails.map((poster) => poster.posterId);
    dispatch(removePurchasedPosters(purchasedPosterIds));

    navigate("/order-history");

  } catch (error) {
    console.error("Verification Error:", error);
    toast.error(error.message || "Payment verification failed.");
  } finally {
    dispatch(setPaymentLoading(false));
  }
}
