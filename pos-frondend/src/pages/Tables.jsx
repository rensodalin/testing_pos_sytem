// import React, { useState } from 'react';
// import BottomNav from '../components/shared/BottomNav';
// import BackButton from '../components/shared/BackButton';
// import TableCard from '../components/tables/TableCard';
// import { tables } from '../constants';

// const Tables = () => {
//   const [status, setStatus] = useState("all");

//   return (
//     <section className='bg-[#1f1f1f] min-h-screen overflow-auto'>
//       <div className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-10 py-4 space-y-4 sm:space-y-0">
//         <div className="flex items-center gap-4">
//           <BackButton />
//           <h1 className="text-[#f5f5f5] text-xl md:text-2xl font-bold tracking-wide">Tables</h1>
//         </div>

//         <div className="flex items-center justify-around gap-4">
//         <button
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

//       {/* Move TableCard outside the header */}
//       <div className="flex flex-wrap justify-center gap-5 px-10 py-5 overflow-y-scroll h-[700px] scrollbar-hide">
//         {
//           tables.map((table) =>{
//             return (
//               <TableCard key ={table.id} id={table.id} name={table.name} status={table.status} initials={table.initial} />
//               )
//           })
//         }
//       </div>

//       <BottomNav />
//     </section>
//   );
// };

// export default Tables;
// import React, { useState } from 'react';
// import BottomNav from '../components/shared/BottomNav';
// import BackButton from '../components/shared/BackButton';
// import TableCard from '../components/tables/TableCard';
// import { tables } from '../constants';
// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { getTables } from '../https';
// import { enqueueSnackbar } from 'notistack';

// const Tables = () => {
//   const [status, setStatus] = useState("all");
//   const {data:resData} = useQuery({
//     queryKey: ['tables'],
//     queryFn: async () =>  {
//       return await getTables();
//     },
//     placeholderData : keepPreviousData,
//   });

//   if(isError){
//     enqueueSnackbar("something went wrong !" , {variant : "error"})
//   }
//   console.log(resData);

//   // Filter tables based on status
//   const filteredTables = tables.filter(table => {
//     if (status === "all") return true;
//     if (status === "booked") return table.status === "Booked";
//     return true;
//   });

//   return (
//     <section className='bg-[#1f1f1f] min-h-screen'>
//       <div className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-10 py-4 space-y-4 sm:space-y-0">
//         <div className="flex items-center gap-4">
//           <BackButton />
//           <h1 className="text-[#f5f5f5] text-xl md:text-2xl font-bold tracking-wide">Tables</h1>
//         </div>

//         <div className="flex items-center justify-around gap-4">
//           <button
//             onClick={() => setStatus("all")}
//             className={`text-[#ababab] text-lg ${
//               status === "all" && "bg-[#383838] rounded-lg px-5 py-2"
//             } rounded-lg px-5 py-2 font-semibold`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setStatus("booked")}
//             className={`text-[#ababab] text-lg ${
//               status === "booked" && "bg-[#383838] rounded-lg px-5 py-2"
//             } rounded-lg px-5 py-2 font-semibold`}
//           >
//             Booked
//           </button>
//         </div>
//       </div>

//       {/* Fixed: Removed fixed height and overflow-y-scroll */}
//       <div className="flex flex-wrap justify-center gap-5 px-4 md:px-10 py-5 pb-20">
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
import React, { useState } from 'react';
import BottomNav from '../components/shared/BottomNav';
import BackButton from '../components/shared/BackButton';
import TableCard from '../components/tables/TableCard';
import { useQuery } from '@tanstack/react-query';
import { getTables } from '../https';
import { enqueueSnackbar } from 'notistack';

const Tables = () => {
  const [status, setStatus] = useState("all");

  const { data: resData, isError } = useQuery({
    queryKey: ['tables'],
    queryFn: getTables,
    keepPreviousData: true,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  // Filter tables based on status
  const filteredTables = resData?.data?.data?.filter(table => {
    if (status === "all") return true;
    if (status === "booked") return table.status === "Booked";
    return true;
  }) || [];

  return (
    <section className='bg-[#1f1f1f] min-h-screen'>
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-10 py-4 space-y-4 sm:space-y-0">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-xl md:text-2xl font-bold tracking-wide">Tables</h1>
        </div>

        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("all")}
            className={`text-[#ababab] text-lg ${status === "all" ? "bg-[#383838]" : ""} rounded-lg px-5 py-2 font-semibold`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("booked")}
            className={`text-[#ababab] text-lg ${status === "booked" ? "bg-[#383838]" : ""} rounded-lg px-5 py-2 font-semibold`}
          >
            Booked
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-5 px-4 md:px-10 py-5 pb-20">
        {filteredTables.map((table, index) => (
          <TableCard 
            key={table._id || table.tableNo || index}  // Unique key fallback
            id={table._id}
            name={table.tableNo}
            status={table.status}
            initials={table?.currentOrder?.customerDetails?.name || ""}
            seats={table.seats}
          />
        ))}
      </div>

      <BottomNav />
    </section>
  );
};

export default Tables;
