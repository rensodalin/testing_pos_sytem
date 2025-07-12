import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { setCustomer, updateTable } from "../../redux/slices/customerSlice";
import { enqueueSnackbar } from "notistack";
import { createOrder, getTables } from "../../https";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [tables, setTables] = useState([]);
  const [loadingTables, setLoadingTables] = useState(false);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    setLoadingTables(true);
    try {
      const res = await getTables();
      setTables(res.data);
    } catch (error) {
      enqueueSnackbar("Failed to load tables", { variant: "error" });
    } finally {
      setLoadingTables(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const increment = () => {
    if (guestCount >= 6) return;
    setGuestCount((prev) => prev + 1);
  };
  const decrement = () => {
    if (guestCount <= 0) return;
    setGuestCount((prev) => prev - 1);
  };

  const isActive = (path) => location.pathname === path;

  const availableTables = tables.filter((t) => (t.status || "Available").toLowerCase() === "available");

  const handleCreateOrder = async () => {
    if (!name.trim()) {
      enqueueSnackbar("Please enter customer name", { variant: "warning" });
      return;
    }

    if (!phone.trim()) {
      enqueueSnackbar("Please enter customer phone", { variant: "warning" });
      return;
    }

    if (!selectedTable) {
      enqueueSnackbar("Please select a table", { variant: "warning" });
      return;
    }

    const selectedTableData = tables.find((t) => t.id === parseInt(selectedTable) || t._id === selectedTable);

    if (!selectedTableData) {
      enqueueSnackbar("Selected table not found", { variant: "error" });
      return;
    }

    try {
      // Send data in the correct format that backend expects
      const orderData = {
        customerName: name,                    // ✅ Correct field name
        customerPhone: phone,                  // ✅ Correct field name
        guests: parseInt(guestCount) || 1,
        tableId: selectedTableData.id || selectedTableData._id,
        tableNo: selectedTableData.tableNo || selectedTableData.name,
        orderType: "dine-in",
        items: [],                             // ✅ Empty array for now (no items selected yet)
        paymentMethod: "cash",
        paymentStatus: "pending"
      };

      const res = await createOrder(orderData);

      // Check if the response is successful
      if (res.data && res.data.success) {
        dispatch(setCustomer({ name, phone, guests: guestCount }));
        dispatch(updateTable({ table: { tableId: selectedTableData.id || selectedTableData._id, tableNo: selectedTableData.tableNo || selectedTableData.name } }));

        enqueueSnackbar("Order created successfully!", { variant: "success" });
        navigate("/menu");

        // Reset form
        closeModal();
        setName("");
        setPhone("");
        setGuestCount(0);
        setSelectedTable("");
      } else {
        throw new Error(res.data?.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to create order. Please try again.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around">
      <button
        onClick={() => navigate("/")}
        className={`flex items-center justify-center font-bold ${
          isActive("/") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"
        } w-[300px] rounded-[20px]`}
      >
        <FaHome className="inline mr-2" size={20} /> <p>Home</p>
      </button>
      <button
        onClick={() => navigate("/orders")}
        className={`flex items-center justify-center font-bold ${
          isActive("/orders") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"
        } w-[300px] rounded-[20px]`}
      >
        <MdOutlineReorder className="inline mr-2" size={20} /> <p>Orders</p>
      </button>
      <button
        onClick={() => navigate("/tables")}
        className={`flex items-center justify-center font-bold ${
          isActive("/tables") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"
        } w-[300px] rounded-[20px]`}
      >
        <MdTableBar className="inline mr-2" size={20} /> <p>Tables</p>
      </button>
      <button className="flex items-center justify-center font-bold text-[#ababab] w-[300px]">
        <CiCircleMore className="inline mr-2" size={20} /> <p>More</p>
      </button>

      <button
        disabled={isActive("/tables") || isActive("/menu")}
        onClick={openModal}
        className="absolute bottom-6 bg-[#F6B100] text-[#f5f5f5] rounded-full p-4 items-center"
      >
        <BiSolidDish size={40} />
      </button>

      {isModalOpen && (
        <Modal setIsTableModalOpen={setIsModalOpen} action="order">
          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">Customer Name</label>
            <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter customer name"
                className="bg-transparent flex-1 text-white focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Customer Phone</label>
            <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="+91-9999999999"
                className="bg-transparent flex-1 text-white focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 mt-3 text-sm font-medium text-[#ababab]">Guest</label>
            <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg">
              <button onClick={decrement} type="button" className="text-yellow-500 text-2xl">&minus;</button>
              <span className="text-white">{guestCount} Person</span>
              <button onClick={increment} type="button" className="text-yellow-500 text-2xl">&#43;</button>
            </div>
          </div>
          <div>
            <label className="block text-gray-500 mb-2 mt-3 text-sm font-medium">Select Table</label>
            <div className="flex items-center rounded-lg p-3 px-4 bg-gray-500">
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="bg-transparent flex-1 text-black focus:outline-none"
                disabled={loadingTables}
              >
                <option value="">-- Select an available table --</option>
                {loadingTables ? (
                  <option disabled>Loading tables...</option>
                ) : (
                  availableTables.map((table) => (
                    <option key={table.id || table._id} value={table.id || table._id}>
                      {table.tableNo || table.name} (Seats: {table.seats})
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <button
            onClick={handleCreateOrder}
            className="w-full bg-[#F6B100] text-[#f5f5f5] rounded-lg py-3 mt-8 hover:bg-yellow-700"
            type="button"
          >
            Create Order
          </button>
        </Modal>
      )}
    </div>
  );
};

export default BottomNav;
