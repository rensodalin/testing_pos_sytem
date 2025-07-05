import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";
import { enqueueSnackbar } from "notistack";
import { removeAllItems } from "../../redux/slices/cartSlice";
import { removeCustomer } from "../../redux/slices/customerSlice";
import { addOrder } from "../../redux/slices/ordersSlice";
import Invoice from "../invoice/Invoice";
import StaffOrderForm from "./StaffOrderForm";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Bill = () => {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;
  const [paymentMethod, setPaymentMethod] = useState();
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState();
  const [showStaffOrderForm, setShowStaffOrderForm] = useState(false);

  const handlePlaceOrder = () => {
    if (cartData.length === 0) {
      enqueueSnackbar("Cart is empty!", { variant: "warning" });
      return;
    }
    
    if (!customerData.table?.tableNo) {
      enqueueSnackbar("Please assign a table first!", { variant: "warning" });
      return;
    }
    
    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method!", { variant: "warning" });
      return;
    }

    // Show staff order form for dine-in orders
    setShowStaffOrderForm(true);
  };

  const handleCreateOrder = (orderData) => {
    // Add the order to the orders slice
    dispatch(addOrder(orderData));
    
    // Show invoice
    setOrderInfo({
      customerDetails: {
        name: orderData.customer,
        phone: customerData.customerPhone,
        guests: customerData.guests,
      },
      orderStatus: orderData.status,
      bills: {
        total: total,
        tax: tax,
        totalWithTax: totalPriceWithTax,
      },
      items: cartData,
      table: { tableNo: orderData.tableNo },
      paymentMethod: orderData.paymentStatus === "paid" ? "Online" : "Cash",
    });
    
    setShowInvoice(true);
    dispatch(removeAllItems());
    setShowStaffOrderForm(false);
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    // Clear customer data after invoice is closed
    dispatch(removeCustomer());
  };

  return (
    <>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Items({cartData.length})
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">
          ₹{total.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Tax(5.25%)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">₹{tax.toFixed(2)}</h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Total With Tax
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">
          ₹{totalPriceWithTax.toFixed(2)}
        </h1>
      </div>
      
      {/* Table Information Display */}
      <div className="px-5 mt-4">
        <div className="bg-[#1f1f1f] rounded-lg px-3 py-2 mb-2">
          <p className="text-xs text-[#ababab] font-medium">Table</p>
          <p className="text-[#f5f5f5] font-semibold">
            {customerData.table?.tableNo || "Not assigned"}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${
            paymentMethod === "Cash" ? "bg-[#383737]" : ""
          }`}
        >
          Cash
        </button>
        <button
          onClick={() => setPaymentMethod("Online")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${
            paymentMethod === "Online" ? "bg-[#383737]" : ""
          }`}
        >
          Online
        </button>
      </div>

      <div className="flex items-center gap-3 px-5 mt-4">
        <button className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg">
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
          disabled={cartData.length === 0}
          className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Place Order
        </button>
      </div>

      {/* Staff Order Form Modal */}
      {showStaffOrderForm && (
        <StaffOrderForm
          onClose={() => setShowStaffOrderForm(false)}
          selectedItems={cartData}
          total={totalPriceWithTax}
          onSubmit={handleCreateOrder}
        />
      )}

      {/* Invoice Modal */}
      {showInvoice && (
        <Invoice orderInfo={orderInfo} setShowInvoice={handleCloseInvoice} />
      )}
    </>
  );
};

export default Bill;
