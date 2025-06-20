// import React from 'react'
// import BottomNav from '../components/shared/BottomNav'
// import BackButton from '../components/shared/BackButton'
// import { IoIosCafe } from "react-icons/io";
// import MenuContainer from '../components/menu/MenuContainer';
// import CustomerInfo from '../components/menu/CustomerInfo';
// import CartInfo from '../components/menu/CartInfo';
// import Bill from '../components/menu/Bill';
// import { useSelector } from 'react-redux';
// const Menu = () => {
//   const customerData = useSelector(state => state.customer);

//   return (
//     <section className='bg-[#202a3e] min-h-[calc(100vh-5rem)] overflow-y-auto flex flex-col lg:flex-row gap-3 p-4'>
//     <div className='w-full lg:flex-[3]'>
//     <div className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-10 py-4 space-y-4 sm:space-y-0">
//         <div className="flex items-center gap-4">
//           <BackButton />
//           <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wide">
//             Menu
//           </h1>
//         </div>
//         <div className="flex items-center justify-around gap-4">
//         <div className="flex items-center gap-3 cursor-pointer">
//           <IoIosCafe className="text-[#f5f5f5] text-4xl" />
//           <div className="flex flex-col items-start">
//             <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
//              {customerData.customerName || "customer Name"} 
//             </h1>
//             <p className="text-xs text-[#ababab] font-medium">
//             {customerData.table || "N/A" }
//             </p>
//           </div>
//         </div>
//         </div>
//       </div>
//       <MenuContainer />
//     </div>
//     {/* right div  */}
//     <div className='flex-[1] bg-[#262b42] mt-4 mr-3 h-[780px] rounded-lg pt-2'>
//         {/* customer infor  */}
//         <CustomerInfo />
//          <hr className='border-[#2a2a2a] border-t-2' />
//          {/* cart items */}
//         < CartInfo />
//         {/* bill  */}
//         <hr className='border-[#2a2a2a] border-t-2' />
//         <Bill />
//     </div>

//       <BottomNav />
//     </section>
//   )
// }

// export default Menu
import React from 'react'
import BottomNav from '../components/shared/BottomNav'
import BackButton from '../components/shared/BackButton'
import { IoIosCafe } from "react-icons/io";
import MenuContainer from '../components/menu/MenuContainer';
import CustomerInfo from '../components/menu/CustomerInfo';
import CartInfo from '../components/menu/CartInfo';
import Bill from '../components/menu/Bill';
import { useSelector } from 'react-redux';

const Menu = () => {
  const customerData = useSelector(state => state.customer);
  
  return (
    <section className='bg-[#202a3e] min-h-[calc(100vh-5rem)] overflow-y-auto flex flex-col lg:flex-row gap-3 p-4'>
      <div className='w-full lg:flex-[3]'>
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-10 py-4 space-y-4 sm:space-y-0">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wide">
              Menu
            </h1>
          </div>
          <div className="flex items-center justify-around gap-4">
            <div className="flex items-center gap-3 cursor-pointer">
              <IoIosCafe className="text-[#f5f5f5] text-4xl" />
              <div className="flex flex-col items-start">
                <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
                  {customerData.customerName || "customer Name"}
                </h1>
                <p className="text-xs text-[#ababab] font-medium">
                  {customerData.table || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <MenuContainer />
      </div>
      
      {/* Fixed right div with proper scrolling */}
      <div className='flex-[1] bg-[#262b42] mt-4 mr-3 h-[780px] rounded-lg pt-2 overflow-y-auto'>
        {/* customer info */}
        <CustomerInfo />
        
        <hr className='border-[#2a2a2a] border-t-2' />
        
        {/* cart items */}
        <CartInfo />
        
        {/* bill */}
        <hr className='border-[#2a2a2a] border-t-2' />
        <div className="pb-6"> {/* Added padding wrapper for Bill */}
          <Bill />
        </div>
      </div>
      
      <BottomNav />
    </section>
  )
}

export default Menu
