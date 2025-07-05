import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaStar, FaFilter } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { hotDrinks, coldDrinks, juices, popularDishes } from "../constants";
import { addItem, removeItem, getTotalItems, updateQuantity } from "../redux/slices/cartSlice";
import { enqueueSnackbar } from "notistack";

const CustomerMenu = () => {
  useEffect(() => {
    document.title = "Cafio | Menu";
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const totalItems = useSelector(getTotalItems);
  const userData = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Combine all menu items
  const allMenuItems = [
    ...hotDrinks.map(item => ({ ...item, category: "Hot Drinks", image: popularDishes[0]?.image })),
    ...coldDrinks.map(item => ({ ...item, category: "Cold Drinks", image: popularDishes[1]?.image })),
    ...juices.map(item => ({ ...item, category: "Juices", image: popularDishes[2]?.image })),
    ...popularDishes.map(item => ({ ...item, category: "Popular", price: 120 }))
  ];

  const categories = ["all", "Hot Drinks", "Cold Drinks", "Juices", "Popular"];

  // Filter and sort items
  const filteredItems = allMenuItems
    .filter(item => 
      (selectedCategory === "all" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleAddToCart = (item) => {
    dispatch(addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image
    }));
    enqueueSnackbar(`${item.name} added to cart!`, { variant: "success" });
  };

  const handleRemoveFromCart = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id: itemId, quantity: item.quantity - 1 }));
      enqueueSnackbar("Item quantity decreased!", { variant: "info" });
    } else {
      dispatch(removeItem(itemId));
      enqueueSnackbar("Item removed from cart!", { variant: "info" });
    }
  };

  const getItemQuantity = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="bg-[#1f1f1f] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a1a1a] p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-[#f5f5f5]">Menu</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <FaShoppingCart 
                  className="text-yellow-400 text-xl cursor-pointer"
                  onClick={() => navigate("/customer/cart")}
                />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={() => navigate("/customer/dashboard")}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Dashboard
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ababab]" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#262626] text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-[#262626] text-[#ababab] hover:bg-[#333]"
                }`}
              >
                {category === "all" ? "All Items" : category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <FaFilter className="text-[#ababab]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#262626] text-[#f5f5f5] px-3 py-1 rounded-lg border border-[#333] focus:outline-none"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-[#262626] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {/* Item Image */}
              <div className="h-48 bg-[#1f1f1f] flex items-center justify-center">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <MdRestaurantMenu className="text-6xl text-[#ababab]" />
                )}
              </div>

              {/* Item Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[#f5f5f5] font-semibold text-lg">{item.name}</h3>
                  <span className="text-yellow-400 font-bold">₹{item.price}</span>
                </div>
                
                <p className="text-[#ababab] text-sm mb-3">{item.category}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={12}
                      className="text-yellow-400"
                    />
                  ))}
                  <span className="text-[#ababab] text-sm ml-1">(4.5)</span>
                </div>

                {/* Add to Cart */}
                <div className="flex items-center gap-2">
                  {getItemQuantity(item.id) > 0 ? (
                    <>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700"
                      >
                        -
                      </button>
                      <span className="text-[#f5f5f5] font-medium w-8 text-center">
                        {getItemQuantity(item.id)}
                      </span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-700"
                      >
                        +
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <MdRestaurantMenu className="text-6xl text-[#ababab] mx-auto mb-4" />
            <p className="text-[#ababab] text-lg">No items found matching your search.</p>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <button
          onClick={() => navigate("/customer/cart")}
          className="fixed bottom-6 right-6 bg-yellow-400 text-gray-900 p-4 rounded-full shadow-lg hover:bg-yellow-500 transition-colors"
        >
          <FaShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      )}
    </div>
  );
};

export default CustomerMenu; 