import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { enqueueSnackbar } from "notistack"

const Modal = ({ setIsTableModalOpen, action }) => {
  // Table state
  const [tableData, setTableData] = useState({ tableNo: "", seats: "" });
  // Category state
  const [categoryName, setCategoryName] = useState("");
  // Dish state
  const [dishData, setDishData] = useState({ name: "", price: "", category: "", image: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (action === "table") {
      setTableData((prev) => ({ ...prev, [name]: value }));
    } else if (action === "dishes") {
      setDishData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (e) => setCategoryName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === "table") {
      enqueueSnackbar("Table added (local only)", { variant: "success" });
    } else if (action === "category") {
      enqueueSnackbar("Category added (local only)", { variant: "success" });
    } else if (action === "dishes") {
      enqueueSnackbar("Dish added (local only)", { variant: "success" });
    }
    setIsTableModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsTableModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#262626] p-6 rounded-lg shadow-lg w-96"
      >
        {/* Modal Header */}
        <div className="flex justify-between item-center mb-4">
          <h2 className="text-[#f5f5f5] text-xl font-semibold">Add {action === "table" ? "Table" : action === "category" ? "Category" : "Dish"}</h2>
          <button
            onClick={handleCloseModal}
            className="text-[#f5f5f5] hover:text-red-500"
          >
            <IoMdClose size={24} />
          </button>
        </div>
        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
          {action === "table" && (
            <>
              <div>
                <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
                  Table Number
                </label>
                <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                  <input
                    type="number"
                    name="tableNo"
                    value={tableData.tableNo}
                    onChange={handleInputChange}
                    className="bg-transparent flex-1 text-white focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
                  Number of Seats
                </label>
                <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                  <input
                    type="number"
                    name="seats"
                    value={tableData.seats}
                    onChange={handleInputChange}
                    className="bg-transparent flex-1 text-white focus:outline-none"
                    required
                  />
                </div>
              </div>
            </>
          )}
          {action === "category" && (
            <>
              <div>
                <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
                  Category Name
                </label>
                <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                  <input
                    type="text"
                    name="categoryName"
                    value={categoryName}
                    onChange={handleCategoryChange}
                    className="bg-transparent flex-1 text-white focus:outline-none"
                    required
                  />
                </div>
              </div>
            </>
          )}
          {action === "dishes" && (
            <>
              <div>
                <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
                  Dish Name
                </label>
                <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                  <input
                    type="text"
                    name="name"
                    value={dishData.name}
                    onChange={handleInputChange}
                    className="bg-transparent flex-1 text-white focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
                  Price
                </label>
                <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                  <input
                    type="number"
                    name="price"
                    value={dishData.price}
                    onChange={handleInputChange}
                    className="bg-transparent flex-1 text-white focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
                  Category
                </label>
                <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                  <input
                    type="text"
                    name="category"
                    value={dishData.category}
                    onChange={handleInputChange}
                    className="bg-transparent flex-1 text-white focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
                  Image URL
                </label>
                <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                  <input
                    type="text"
                    name="image"
                    value={dishData.image}
                    onChange={handleInputChange}
                    className="bg-transparent flex-1 text-white focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full rounded-lg mt-10 mb-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
          >
            {action === "table" && "Add Table"}
            {action === "category" && "Add Category"}
            {action === "dishes" && "Add Dish"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Modal;
