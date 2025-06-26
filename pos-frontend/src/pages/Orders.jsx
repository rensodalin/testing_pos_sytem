// import React, { useState, useEffect } from "react";
// import BottomNav from "../components/shared/BottomNav";
// import OrderCard from "../components/orders/OrderCard";
// import BackButton from "../components/shared/BackButton";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { getOrders } from "../https/index";
// import { enqueueSnackbar } from "notistack"

// const Orders = () => {

//   const [status, setStatus] = useState("all");

//     useEffect(() => {
//       document.title = "POS | Orders"
//     }, [])

//   const { data: resData, isError } = useQuery({
//     queryKey: ["orders"],
//     queryFn: async () => {
//       return await getOrders();
//     },
//     placeholderData: keepPreviousData
//   })

//   if(isError) {
//     enqueueSnackbar("Something went wrong!", {variant: "error"})
//   }

//   return (
//     <section className="bg-[#1f1f1f]  h-[calc(100vh-5rem)] overflow-hidden">
//       <div className="flex items-center justify-between px-10 py-4">
//         <div className="flex items-center gap-4">
//           <BackButton />
//           <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
//             Orders
//           </h1>
//         </div>
//         <div className="flex items-center justify-around gap-4">
//           <button onClick={() => setStatus("all")} className={`text-[#ababab] text-lg ${status === "all" && "bg-[#383838] rounded-lg px-5 py-2"}  rounded-lg px-5 py-2 font-semibold`}>
//             All
//           </button>
//           <button onClick={() => setStatus("progress")} className={`text-[#ababab] text-lg ${status === "progress" && "bg-[#383838] rounded-lg px-5 py-2"}  rounded-lg px-5 py-2 font-semibold`}>
//             In Progress
//           </button>
//           <button onClick={() => setStatus("ready")} className={`text-[#ababab] text-lg ${status === "ready" && "bg-[#383838] rounded-lg px-5 py-2"}  rounded-lg px-5 py-2 font-semibold`}>
//             Ready
//           </button>
//           <button onClick={() => setStatus("completed")} className={`text-[#ababab] text-lg ${status === "completed" && "bg-[#383838] rounded-lg px-5 py-2"}  rounded-lg px-5 py-2 font-semibold`}>
//             Completed
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-3 px-16 py-4 overflow-y-scroll scrollbar-hide">
//         {
//           resData?.data.data.length > 0 ? (
//             resData.data.data.map((order) => {
//               return <OrderCard key={order._id} order={order} />
//             })
//           ) : <p className="col-span-3 text-gray-500">No orders available</p>
//         }
//       </div>

//       <BottomNav />
//     </section>
//   );
// };

// export default Orders;
// import React, { useState, useEffect } from "react";
// import BottomNav from "../components/shared/BottomNav";
// import OrderCard from "../components/orders/OrderCard";
// import BackButton from "../components/shared/BackButton";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { getOrders } from "../https/index";
// import { enqueueSnackbar } from "notistack";

// const Orders = () => {
//   const [status, setStatus] = useState("all");

//   useEffect(() => {
//     document.title = "POS | Orders";
//   }, []);

//   const { data: resData, isError } = useQuery({
//     queryKey: ["orders"],
//     queryFn: async () => {
//       return await getOrders();
//     },
//     placeholderData: keepPreviousData,
//   });

//   if (isError) {
//     enqueueSnackbar("Something went wrong!", { variant: "error" });
//   }

//   return (
//     <section className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] overflow-y-auto pb-20">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 lg:px-10 py-4 gap-4">
//         <div className="flex items-center gap-4">
//           <BackButton />
//           <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-bold tracking-wider">
//             Orders
//           </h1>
//         </div>

//         <div className="flex overflow-x-auto sm:overflow-visible gap-2 sm:gap-4 w-full sm:w-auto py-2 scrollbar-hide">
//           {["all", "progress", "ready", "completed"].map((type) => (
//             <button
//               key={type}
//               onClick={() => setStatus(type)}
//               className={`text-[#ababab] text-sm sm:text-lg ${
//                 status === type ? "bg-[#383838]" : ""
//               } rounded-lg px-3 sm:px-5 py-2 font-semibold whitespace-nowrap flex-shrink-0`}
//             >
//               {type === "all"
//                 ? "All"
//                 : type.charAt(0).toUpperCase() + type.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-10 py-4">
//         {resData?.data.data.length > 0 ? (
//           resData.data.data.map((order) => (
//             <OrderCard key={order._id} order={order} />
//           ))
//         ) : (
//           <p className="col-span-full text-gray-500 text-center">
//             No orders available
//           </p>
//         )}
//       </div>

//       <BottomNav />
//     </section>
//   );
// };

// export default Orders;
// import React, { useState, useEffect } from "react";
// import BottomNav from "../components/shared/BottomNav";
// import OrderCard from "../components/orders/OrderCard";
// import BackButton from "../components/shared/BackButton";
// import { orders } from "../constants";

// const Orders = () => {
//   const [status, setStatus] = useState("all");

//   useEffect(() => {
//     document.title = "POS | Orders";
//   }, []);

//   // Filter orders based on status
//   const filteredOrders = status === "all" 
//     ? orders 
//     : orders.filter(order => {
//         if (status === "progress") return order.status === "In Progress";
//         if (status === "ready") return order.status === "Ready";
//         if (status === "completed") return order.status === "Completed";
//         return false;
//       });

//   return (
//     <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] flex flex-col">
//       {/* Header Section - Fixed */}
//       <div className="flex-shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 lg:px-10 py-4 gap-4 border-b border-[#383838]">
//         <div className="flex items-center gap-4">
//           <BackButton />
//           <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-bold tracking-wider">
//             Orders
//           </h1>
//         </div>

//         {/* Filter Buttons */}
//         <div className="flex overflow-x-auto sm:overflow-visible gap-2 sm:gap-4 w-full sm:w-auto py-2 scrollbar-hide">
//           {["all", "progress", "ready", "completed"].map((type) => (
//             <button
//               key={type}
//               onClick={() => setStatus(type)}
//               className={`text-[#ababab] text-sm sm:text-lg ${
//                 status === type ? "bg-[#383838]" : ""
//               } rounded-lg px-3 sm:px-5 py-2 font-semibold whitespace-nowrap flex-shrink-0 transition-colors`}
//             >
//               {type === "all"
//                 ? "All"
//                 : type === "progress" 
//                 ? "In Progress"
//                 : type.charAt(0).toUpperCase() + type.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Orders Grid - Scrollable */}
//       <div className="flex-1 overflow-y-auto scrollbar-hide">
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4 sm:p-6 lg:p-8 pb-8">
//           {filteredOrders.length > 0 ? (
//             filteredOrders.map((order) => (
//               <OrderCard key={order.id} order={order} />
//             ))
//           ) : (
//             <div className="col-span-full text-center py-12">
//               <p className="text-gray-500 text-lg">No orders available</p>
//               <p className="text-gray-600 text-sm mt-2">
//                 {status !== "all" && `No ${status} orders found`}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       <BottomNav />
//     </section>
//   );
// };

// export default Orders;
import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";
import { orders } from "../constants";

const Orders = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Orders";
  }, []);

  // Filter orders based on status
  const filteredOrders = status === "all"
    ? orders
    : orders.filter(order => {
        if (status === "progress") return order.status === "In Progress";
        if (status === "ready") return order.status === "Ready";
        if (status === "completed") return order.status === "Completed";
        return false;
      });

  return (
    <section className="bg-[#1f1f1f] min-h-screen scrollbar-hide overflow-y-auto">
      {/* Header Section - Responsive */}
      <div className="sticky top-0 z-10 bg-[#1f1f1f] flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 gap-3 sm:gap-4 border-b border-[#383838]">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-lg sm:text-xl lg:text-2xl font-bold tracking-wider">
            Orders
          </h1>
        </div>

        {/* Filter Buttons - Fully responsive */}
        <div className="flex overflow-x-auto sm:overflow-visible gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto scrollbar-hide">
          {["all", "progress", "ready", "completed"].map((type) => (
            <button
              key={type}
              onClick={() => setStatus(type)}
              className={`text-[#ababab] text-xs sm:text-sm md:text-base ${
                status === type 
                  ? "bg-[#383838] text-white" 
                  : "hover:bg-[#2a2a2a] hover:text-white"
              } rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200 border ${
                status === type ? "border-[#4a4a4a]" : "border-transparent"
              }`}
            >
              {type === "all"
                ? "All"
                : type === "progress"
                ? "In Progress"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid - Responsive with proper spacing */}
      <div className="pb-20 lg:pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 p-3 sm:p-4 md:p-6 lg:p-8">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="w-full">
                <OrderCard order={order} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 sm:py-12 lg:py-16">
              <div className="max-w-md mx-auto">
                <p className="text-gray-400 text-base sm:text-lg lg:text-xl font-medium">
                  No orders available
                </p>
                {status !== "all" && (
                  <p className="text-gray-500 text-sm sm:text-base mt-2">
                    No {status === "progress" ? "in progress" : status} orders found
                  </p>
                )}
                <div className="mt-4">
                  <button
                    onClick={() => setStatus("all")}
                    className="text-blue-400 hover:text-blue-300 text-sm underline transition-colors"
                  >
                    View all orders
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </section>
  );
};

export default Orders;

