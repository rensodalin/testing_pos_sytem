import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { enqueueSnackbar } from "notistack";
import { createTable } from "../../https";

const Modal = ({ setIsTableModalOpen, action, onTableAdded }) => {
  const [tableData, setTableData] = useState({ tableNo: "", seats: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (action === "table") {
        const response = await createTable({
          tableNo: Number(tableData.tableNo),
          seats: Number(tableData.seats),
        });
        console.log("Add table response:", response.data); // <-- add this line to check
        enqueueSnackbar("Table added successfully!", { variant: "success" });
        if (onTableAdded) onTableAdded();
        setIsTableModalOpen(false);
      }
    } catch (error) {
      console.error("Add table error:", error); // <-- add this line to debug
      enqueueSnackbar(error.response?.data?.error || "Failed to add table", {
        variant: "error",
      });
    }
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#f5f5f5] text-xl font-semibold">
            Add {action === "table" ? "Table" : ""}
          </h2>
          <button
            onClick={() => setIsTableModalOpen(false)}
            className="text-[#f5f5f5] hover:text-red-500"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {action === "table" && (
            <>
              <div>
                <label className="block text-[#ababab] mb-2 text-sm font-medium">
                  Table Number
                </label>
                <div className="flex items-center rounded-lg px-4 bg-[#1f1f1f]">
                  <input
                    type="number"
                    name="tableNo"
                    value={tableData.tableNo}
                    onChange={handleInputChange}
                    className="bg-transparent flex-1 text-white py-3 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#ababab] mb-2 text-sm font-medium">
                  Number of Seats
                </label>
                <div className="flex items-center rounded-lg px-4 bg-[#1f1f1f]">
                  <input
                    type="number"
                    name="seats"
                    value={tableData.seats}
                    onChange={handleInputChange}
                    className="bg-transparent flex-1 text-white py-3 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full rounded-lg mt-8 py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
          >
            Add Table
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Modal;
