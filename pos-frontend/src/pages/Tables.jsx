// import React, { useState, useEffect } from "react";
// import BottomNav from "../components/shared/BottomNav";
// import BackButton from "../components/shared/BackButton";
// import TableCard from "../components/tables/TableCard";
// import { tables } from "../constants";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { getTables } from "../https";

// const Tables = () => {
//   const [status, setStatus] = useState("all");

//     useEffect(() => {
//       document.title = "POS | Tables"
//     }, [])

//   const { data: resData, isError } = useQuery({
//     queryKey: ["tables"],
//     queryFn: async () => {
//       return await getTables();
//     },
//     placeholderData: keepPreviousData,
//   });

//   if(isError) {
//     enqueueSnackbar("Something went wrong!", { variant: "error" })
//   }

//   console.log(resData);

//   return (
//     <section className="bg-[#1f1f1f]  h-[calc(100vh-5rem)] overflow-hidden">
//       <div className="flex items-center justify-between px-10 py-4">
//         <div className="flex items-center gap-4">
//           <BackButton />
//           <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
//             Tables
//           </h1>
//         </div>
//         <div className="flex items-center justify-around gap-4">
//           <button
//             onClick={() => setStatus("all")}
//             className={`text-[#ababab] text-lg ${
//               status === "all" && "bg-[#383838] rounded-lg px-5 py-2"
//             }  rounded-lg px-5 py-2 font-semibold`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setStatus("booked")}
//             className={`text-[#ababab] text-lg ${
//               status === "booked" && "bg-[#383838] rounded-lg px-5 py-2"
//             }  rounded-lg px-5 py-2 font-semibold`}
//           >
//             Booked
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-5 gap-3 px-16 py-4 h-[200px] overflow-y-scroll scrollbar-hide">
//         {resData?.data.data.map((table) => {
//           return (
//             <TableCard
//               id={table._id}
//               name={table.tableNo}
//               status={table.status}
//               initials={table?.currentOrder?.customerDetails.name}
//               seats={table.seats}
//             />
//           );
//         })}
//       </div>

//       <BottomNav />
//     </section>
//   );
// };

// export default Tables;
// import React, { useState, useEffect } from "react";
// import BottomNav from "../components/shared/BottomNav";
// import BackButton from "../components/shared/BackButton";
// import TableCard from "../components/tables/TableCard";
// import { tables } from "../constants";

// const Tables = () => {
//   const [status, setStatus] = useState("all");
     
//   useEffect(() => {
//       document.title = "POS | Tables"
//   }, [])

//   // Filter tables based on status
//   const filteredTables = status === "all" 
//     ? tables 
//     : tables.filter(table => table.status.toLowerCase() === status.toLowerCase());

//   return (
//     <section className="bg-[#1f1f1f]  h-[calc(100vh-5rem)] overflow-hidden">
//       <div className="flex items-center justify-between px-10 py-4">
//         <div className="flex items-center gap-4">
//           <BackButton />
//           <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
//             Tables
//           </h1>
//         </div>
//         <div className="flex items-center justify-around gap-4">
//           <button
//             onClick={() => setStatus("all")}
//             className={`text-[#ababab] text-lg ${
//               status === "all" && "bg-[#383838] rounded-lg px-5 py-2"
//             }  rounded-lg px-5 py-2 font-semibold`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setStatus("booked")}
//             className={`text-[#ababab] text-lg ${
//               status === "booked" && "bg-[#383838] rounded-lg px-5 py-2"
//             }  rounded-lg px-5 py-2 font-semibold`}
//           >
//             Booked
//           </button>
//           <button
//             onClick={() => setStatus("available")}
//             className={`text-[#ababab] text-lg ${
//               status === "available" && "bg-[#383838] rounded-lg px-5 py-2"
//             }  rounded-lg px-5 py-2 font-semibold`}
//           >
//             Available
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-5 gap-3 px-16 py-4 h-[200px] overflow-y-scroll scrollbar-hide">
//         {filteredTables.map((table) => {
//           return (
//             <TableCard
//               key={table.id}
//               id={table.id}
//               name={table.name}
//               status={table.status}
//               initials={table.initial}
//               seats={table.seats}
//             />
//           );
//         })}
//       </div>

//       <BottomNav />
//     </section>
//   );
// };

// export default Tables;
// import React, { useState, useEffect } from "react";
// import BottomNav from "../components/shared/BottomNav";
// import BackButton from "../components/shared/BackButton";
// import TableCard from "../components/tables/TableCard";
// import { tables } from "../constants";

// const Tables = () => {
//   const [status, setStatus] = useState("all");
     
//   useEffect(() => {
//       document.title = "POS | Tables"
//   }, [])

//   // Filter tables based on status
//   const filteredTables = status === "all" 
//     ? tables 
//     : tables.filter(table => table.status.toLowerCase() === status.toLowerCase());

//   return (
//     <section className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] overflow-hidden">
//       {/* Header Section */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 lg:px-10 py-4 gap-4">
//         <div className="flex items-center gap-4">
//           <BackButton />
//           <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-bold tracking-wider">
//             Tables
//           </h1>
//         </div>
        
//         {/* Filter Buttons */}
//         <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
//           <button
//             onClick={() => setStatus("all")}
//             className={`text-[#ababab] text-sm sm:text-base lg:text-lg ${
//               status === "all" && "bg-[#383838]"
//             } rounded-lg px-3 sm:px-4 lg:px-5 py-2 font-semibold transition-colors flex-1 sm:flex-none`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setStatus("booked")}
//             className={`text-[#ababab] text-sm sm:text-base lg:text-lg ${
//               status === "booked" && "bg-[#383838]"
//             } rounded-lg px-3 sm:px-4 lg:px-5 py-2 font-semibold transition-colors flex-1 sm:flex-none`}
//           >
//             Booked
//           </button>
//           <button
//             onClick={() => setStatus("available")}
//             className={`text-[#ababab] text-sm sm:text-base lg:text-lg ${
//               status === "available" && "bg-[#383838]"
//             } rounded-lg px-3 sm:px-4 lg:px-5 py-2 font-semibold transition-colors flex-1 sm:flex-none`}
//           >
//             Available
//           </button>
//         </div>
//       </div>

//       {/* Tables Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 px-4 sm:px-6 lg:px-16 py-4 max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide">
//         {filteredTables.map((table) => {
//           return (
//             <TableCard
//               key={table.id}
//               id={table.id}
//               name={table.name}
//               status={table.status}
//               initials={table.initial}
//               seats={table.seats}
//             />
//           );
//         })}
//       </div>

//       <BottomNav />
//     </section>
//   );
// };

// export default Tables;

import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { tables } from "../constants";

const Tables = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Tables";
  }, []);

  const filteredTables =
    status === "all"
      ? tables
      : tables.filter(
          (table) => table.status.toLowerCase() === status.toLowerCase()
        );

  return (
    <section className="bg-[#1f1f1f] min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 lg:px-10 py-4 gap-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-bold tracking-wider">
            Tables
          </h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {["all", "booked", "available"].map((item) => (
            <button
              key={item}
              onClick={() => setStatus(item)}
              className={`text-[#ababab] text-sm sm:text-base lg:text-lg ${
                status === item ? "bg-[#383838] text-white" : ""
              } rounded-lg px-4 py-2 font-semibold transition-colors flex-1 sm:flex-none`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tables Grid */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 sm:px-6 lg:px-16 pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredTables.length > 0 ? (
            filteredTables.map((table) => (
              <TableCard
                key={table.id}
                id={table.id}
                name={table.name}
                status={table.status}
                initials={table.initial}
                seats={table.seats}
              />
            ))
          ) : (
            <p className="text-[#ccc] col-span-full text-center mt-10">
              No tables found for status:{" "}
              <span className="capitalize font-semibold">{status}</span>
            </p>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </section>
  );
};

export default Tables;

