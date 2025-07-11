import React from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const Modal = ({ setIsTableModalOpen, title = "Modal", children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#262626] p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#f5f5f5] text-xl font-semibold">
            {title}
          </h2>
          <button
            onClick={() => setIsTableModalOpen(false)}
            className="text-[#f5f5f5] hover:text-red-500"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Dynamic form or content area */}
        <div className="mt-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
