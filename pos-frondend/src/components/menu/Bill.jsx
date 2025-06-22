import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";
import { enqueueSnackbar } from "notistack";
import { createOrderRazorpay } from "../../https/index";



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
  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const [paymentMethod, setpaymentMethod] = useState();

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method", { variant: "warning" });
      return;
    }
    // load the scripte
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        enqueueSnackbar("Razorpay SDK failed to load. Are you online?", {
          variant: "warning",
        });
        return;
      }

      // create order
      const reqData = {
        amount: totalPriceWithTax.toFixed(2),
      };

      const { data } = await createOrderRazorpay(reqData);

      const options = {
        key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "RESTRO",
        description: "Secure Payment for Your Meal",
        order_id: data.order.id,
        handler: async function (response) {
          const verification = await verifyPaymentRazorpay(response);
          console.log(verification);
          enqueueSnackbar(verification.data.message, { variant: "success" });

          // Place the order
          const orderData = {
            customerDetails: {
              name: customerData.customerName,
              phone: customerData.customerPhone,
              guests: customerData.guests,
            },
            orderStatus: "In Progress",
            bills: {
              total: total,
              tax: tax,
              totalWithTax: totalPriceWithTax,
            },
            items: cartData,
            table: customerData.table.tableId,
            paymentMethod: paymentMethod,
            paymentData: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
            },
          };

          setTimeout(() => {
            orderMutation.mutate(orderData);
          }, 1500);
        },
        prefill: {
          name: customerData.name,
          email: "",
          contact: customerData.phone,
        },
        theme: { color: "#025cca" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Payment Failed!", {
        variant: "error",
      });
    }
  };

  return (
    <div className="pb-8 mb-4">
      {" "}
      {/* Added wrapper with extra padding/margin */}
      <div className="flex items-center justify-between px-3 sm:px-5 mt-2">
        <p className="text-xs sm:text-sm text-[#ababab] font-medium mt-2">
          Item({cartData.length})
        </p>
        <h1 className="text-[#f5f5f5] text-sm sm:text-base font-bold">
          ${total.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center justify-between px-3 sm:px-5 mt-2">
        <p className="text-xs sm:text-sm text-[#ababab] font-medium mt-2">
          Tax(5.25%)
        </p>
        <h1 className="text-[#f5f5f5] text-sm sm:text-base font-bold">
          ${tax.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center justify-between px-3 sm:px-5 mt-2">
        <p className="text-xs sm:text-sm text-[#ababab] font-medium mt-2">
          Total with Tax
        </p>
        <h1 className="text-[#f5f5f5] text-sm sm:text-base font-bold">
          ${totalPriceWithTax.toFixed(2)}
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 px-3 sm:px-5 mt-4">
        <button
          onClick={() => setpaymentMethod("Cash")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold text-sm sm:text-base ${
            paymentMethod === "Cash" ? "bg-[#383737]" : ""
          }`}
        >
          Cash
        </button>
        <button
          onClick={() => setpaymentMethod("o")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold text-sm sm:text-base ${
            paymentMethod === "Online ? " ? "bg-[#383737]" : ""
          }`}
        >
          Online
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 px-3 sm:px-5 mt-4">
        <button className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-sm sm:text-lg">
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
          className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-sm sm:text-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Bill;
