import { useEffect, useState } from "react";
import { getOrderHistory } from "../services/operations/posterDetailsAPI";
import { useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import { addReview } from "../services/operations/RatingAPI";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

// --- SVG Icons for UI Elements ---
const StarIcon = ({ className, onClick, onMouseEnter, onMouseLeave }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  </svg>
);

const EmptyBoxIcon = () => (
  <svg className="w-24 h-24 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m0 0v10l8 4m0-14L4 7m16 0v10l-8 4M4 7v10l8 4"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 7l8 4 8-4"></path></svg>
);


const OrderHistory = () => {
  const { token } = useSelector((state) => state.auth || {});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const data = await getOrderHistory(token);
        setOrders(data || []);
      } catch (error) {
        console.error("Order history fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrderHistory();
    else setLoading(false);
  }, [token]);

  const openRatingModal = (item) => {
    setSelectedItem(item);
    setRating(0);
    setComment("");
    setShowModal(true);
  };

  const submitRating = async () => {
    const intRating = parseInt(rating);
    if (!intRating || !comment.trim()) {
      // Replace alert with a more modern notification system if available
      console.error("Please provide a rating and a comment.");
      // toast.error("Please provide a rating and a comment.");
      return;
    }

    const posterId = selectedItem?.productId?._id;
    if (!posterId) {
      console.error("Invalid poster selected.");
      // toast.error("Could not submit review. Invalid product.");
      return;
    }

    try {
      await addReview(posterId, intRating, comment, token);
      // toast.success("Review submitted successfully!");
      setShowModal(false);
      // Optionally, refresh orders or give feedback
    } catch (err) {
      console.error("Error in rating submission", err);
      // toast.error("Failed to submit review.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-black dark:border-white"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-12 pt-24"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <EmptyBoxIcon />
            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">No Orders Yet</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">You haven't placed any orders. Let's change that!</p>
            {/* UPDATED: Added theme-aware styling to the "Start Shopping" button */}
            <Link to="/" className="mt-6 inline-block bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, orderIndex) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: orderIndex * 0.1 }}
                className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800 overflow-hidden"
              >
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 md:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      Order ID: <span className="font-normal text-sm text-gray-600 dark:text-gray-400">{order._id}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Placed on: {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${order.isDelivered
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                  >
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </span>
                </div>

                <div className="p-4 md:p-6 space-y-4">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <img
                        src={item.productId?.posterImage?.image}
                        alt={item.productId?.title}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {item.productId?.title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                          Qty: {item.quantity} • Size: {item.posterSize}
                        </p>
                        <p className="font-semibold text-gray-800 dark:text-white mt-1">₹{item.productId?.price}</p>
                        <button
                          onClick={() => openRatingModal(item)}
                          className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold"
                        >
                          <StarIcon className="w-4 h-4 text-yellow-500" />
                          Rate Product
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end items-center mt-4 bg-gray-50 dark:bg-gray-700 px-4 py-3 md:px-6 text-gray-800 dark:text-white font-semibold text-lg">
                  <span className="mr-2 text-base font-medium text-gray-600 dark:text-gray-300">Order Total:</span>
                  <span>₹{order.totalPrice.toFixed(2)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Rating Modal */}
      <AnimatePresence>
        {showModal && (
          <Dialog static open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30" aria-hidden="true"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 z-20 relative"
              >
                <Dialog.Title className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Rate '{selectedItem?.productId?.title}'</Dialog.Title>

                <div className="flex justify-center space-x-2 my-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`cursor-pointer text-4xl transition-colors ${star <= (hover || rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    />
                  ))}
                </div>

                <textarea
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-black focus:border-black dark:focus:ring-white dark:focus:border-white"
                  rows="4"
                  placeholder="Share your thoughts on this poster..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <div className="flex justify-end mt-6 gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold text-sm"
                  >
                    Cancel
                  </button>
                  {/* UPDATED: Added theme-aware styling to the "Submit Review" button */}
                  <button
                    onClick={submitRating}
                    className="px-5 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold text-sm"
                  >
                    Submit Review
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrderHistory;
