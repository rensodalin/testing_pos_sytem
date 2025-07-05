import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { removeItem, addItem, getTotalPrice, removeAllItems, updateQuantity } from "../redux/slices/cartSlice";
import { setCurrentOrder, setDeliveryInfo } from "../redux/slices/customerSlice";
import { addLoyaltyPoints } from "../redux/slices/userSlice";
import { addOrder } from "../redux/slices/ordersSlice";
import { enqueueSnackbar } from "notistack";

const CustomerCart = () => {
  useEffect(() => {
    document.title = "Cafio | Cart";
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const userData = useSelector((state) => state.user);

  const [deliveryType, setDeliveryType] = useState("delivery"); // "delivery" or "pickup"
  const [deliveryAddress, setDeliveryAddress] = useState(userData.address || "");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const taxRate = 5.25;
  const deliveryFee = deliveryType === "delivery" ? 50 : 0;
  const tax = (total * taxRate) / 100;
  const totalWithTaxAndDelivery = total + tax + deliveryFee;

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        dispatch(removeItem(itemId));
      } else {
        dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
      }
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
    enqueueSnackbar("Item removed from cart!", { variant: "info" });
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      enqueueSnackbar("Your cart is empty!", { variant: "warning" });
      return;
    }

    if (deliveryType === "delivery" && !deliveryAddress.trim()) {
      enqueueSnackbar("Please enter delivery address!", { variant: "warning" });
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      const orderData = {
        customerId: userData._id,
        customer: userData.name,
        items: cartItems,
        total: totalWithTaxAndDelivery,
        orderType: "online", // Customer orders are always online
        paymentStatus: paymentMethod === "cash" ? "pending" : "paid", // Cash on delivery is pending
        deliveryType: deliveryType,
        deliveryAddress: deliveryAddress,
        deliveryInstructions: deliveryInstructions,
        paymentMethod: paymentMethod,
        status: paymentMethod === "cash" ? "In Progress" : "Ready", // If paid, ready; if cash, in progress
        estimatedTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
        createdAt: new Date().toISOString()
      };

      // Add order to the orders slice (visible to staff)
      dispatch(addOrder(orderData));

      // Update customer state
      dispatch(setCurrentOrder(orderData));
      dispatch(setDeliveryInfo({ address: deliveryAddress, instructions: deliveryInstructions }));
      
      // Add loyalty points (1 point per 10 rupees spent)
      const pointsEarned = Math.floor(totalWithTaxAndDelivery / 10);
      dispatch(addLoyaltyPoints(pointsEarned));

      // Clear cart
      dispatch(removeAllItems());

      enqueueSnackbar(`Order placed successfully! You earned ${pointsEarned} loyalty points.`, { 
        variant: "success" 
      });

      navigate("/customer/dashboard");
      setIsProcessing(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#1f1f1f] min-h-screen">
        <div className="container mx-auto p-4">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/customer/menu")}
              className="text-[#ababab] hover:text-yellow-400"
            >
              <FaArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-[#f5f5f5]">Cart</h1>
          </div>

          <div className="text-center py-12">
            <MdRestaurantMenu className="text-6xl text-[#ababab] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#f5f5f5] mb-2">Your cart is empty</h2>
            <p className="text-[#ababab] mb-6">Add some delicious items to get started!</p>
            <button
              onClick={() => navigate("/customer/menu")}
              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500"
            >
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1f1f1f] min-h-screen">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/customer/menu")}
            className="text-[#ababab] hover:text-yellow-400"
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-[#f5f5f5]">Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-[#262626] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#f5f5f5] mb-4">Order Items</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-[#1f1f1f] rounded-lg">
                    <div className="w-16 h-16 bg-[#333] rounded-lg flex items-center justify-center">
                      <MdRestaurantMenu className="text-2xl text-[#ababab]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#f5f5f5] font-medium">{item.name}</h3>
                      <p className="text-[#ababab] text-sm">{item.category}</p>
                      <p className="text-yellow-400 font-semibold">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700"
                      >
                        -
                      </button>
                      <span className="text-[#f5f5f5] font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-700"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#262626] rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-[#f5f5f5] mb-4">Order Summary</h2>

              {/* Delivery Type */}
              <div className="mb-4">
                <label className="text-[#ababab] text-sm mb-2 block">Delivery Type</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDeliveryType("delivery")}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                      deliveryType === "delivery"
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-[#1f1f1f] text-[#ababab]"
                    }`}
                  >
                    <FaMapMarkerAlt className="inline mr-2" />
                    Delivery
                  </button>
                  <button
                    onClick={() => setDeliveryType("pickup")}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                      deliveryType === "pickup"
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-[#1f1f1f] text-[#ababab]"
                    }`}
                  >
                    <FaClock className="inline mr-2" />
                    Pickup
                  </button>
                </div>
              </div>

              {/* Delivery Address */}
              {deliveryType === "delivery" && (
                <div className="mb-4">
                  <label className="text-[#ababab] text-sm mb-2 block">Delivery Address</label>
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter delivery address"
                    className="w-full bg-[#1f1f1f] text-white p-3 rounded-lg border border-[#333] focus:outline-none focus:border-yellow-400"
                    rows="3"
                  />
                </div>
              )}

              {/* Delivery Instructions */}
              <div className="mb-4">
                <label className="text-[#ababab] text-sm mb-2 block">Special Instructions</label>
                <textarea
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  placeholder="Any special instructions?"
                  className="w-full bg-[#1f1f1f] text-white p-3 rounded-lg border border-[#333] focus:outline-none focus:border-yellow-400"
                  rows="2"
                />
              </div>

              {/* Payment Method */}
              <div className="mb-4">
                <label className="text-[#ababab] text-sm mb-2 block">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-[#1f1f1f] text-white p-3 rounded-lg border border-[#333] focus:outline-none"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="cash">Cash on Delivery</option>
                  <option value="upi">UPI</option>
                </select>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-[#ababab]">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-[#ababab]">
                  <span>Tax ({taxRate}%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                {deliveryType === "delivery" && (
                  <div className="flex justify-between text-[#ababab]">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                )}
                <hr className="border-[#333]" />
                <div className="flex justify-between text-[#f5f5f5] font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{totalWithTaxAndDelivery.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing Order..." : "Place Order"}
              </button>

              {/* Loyalty Points Info */}
              <div className="mt-4 text-center">
                <p className="text-[#ababab] text-sm">
                  Earn {Math.floor(totalWithTaxAndDelivery / 10)} loyalty points with this order!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCart; 