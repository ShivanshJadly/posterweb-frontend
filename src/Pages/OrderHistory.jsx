import { useEffect, useState } from "react";
import { getOrderHistory } from "../services/operations/posterDetailsAPI";
import { useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import { FaStar } from "react-icons/fa";
import { addReview } from "../services/operations/RatingAPI";

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
      alert("Please give a rating and comment.");
      return;
    }

    const posterId = selectedItem?.productId?._id;
    if (!posterId) {
      alert("Invalid poster selected.");
      return;
    }

    try {
      await addReview(posterId, intRating, comment, token);
      setShowModal(false);
    } catch (err) {
      console.error("Error in rating submission", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600">Loading order history...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-12 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Order History</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl shadow-sm p-4 md:p-6 bg-white"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                <div>
                  <p className="font-semibold text-gray-800">
                    Order ID: <span className="text-sm text-gray-600">{order._id}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                      order.isDelivered
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-4 border rounded-lg p-3"
                  >
                    <img
                      src={item.productId?.posterImage?.image}
                      alt={item.productId?.title}
                      className="w-full sm:w-32 h-32 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.productId?.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {item.productId?.description?.slice(0, 100)}...
                      </p>
                      <div className="flex gap-6 mt-2 text-sm text-gray-700">
                        <span>Qty: {item.quantity}</span>
                        <span>Size: {item.posterSize}</span>
                        <span>₹{item.productId?.price}</span>
                      </div>
                      <button
                        onClick={() => openRatingModal(item)}
                        className="mt-3 inline-block px-4 py-1 text-sm bg-black text-white rounded hover:bg-gray-800"
                      >
                        Rate this Poster
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6 border-t pt-4 text-gray-800 font-medium text-lg">
                <span>Total:</span>
                <span>₹{order.totalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rating Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-10">
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-20 relative">
            <Dialog.Title className="text-lg font-semibold mb-4">Rate this Poster</Dialog.Title>

            <div className="flex space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
            </div>

            <textarea
              className="w-full border rounded p-2 text-sm"
              rows="4"
              placeholder="Leave a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 rounded border text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={submitRating}
                className="px-4 py-1 rounded bg-black text-white hover:bg-gray-800"
              >
                Submit
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default OrderHistory;
