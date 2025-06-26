import React, { useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Menu = () => {
  useEffect(() => {
    document.title = "POS | Menu";
  }, []);
  
  const customerData = useSelector((state) => state.customer);
  const location = useLocation();
  const searchTerm = location.state?.search || "";
  
  return (
    <section className="bg-[#1f1f1f] min-h-screen scrollbar-hide overflow-y-auto">
      {/* Content Section */}
      <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 pb-20 lg:pb-4 min-h-0">
        {/* Left Section with scrollable menu */}
        <div className="w-full lg:w-3/4 flex flex-col min-h-0">
          {/* Header */}
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-4 w-full xs:w-auto">
              <BackButton />
              <h1 className="text-[#f5f5f5] text-lg sm:text-xl lg:text-2xl font-bold tracking-wider">
                Menu
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer w-full xs:w-auto justify-end xs:justify-start">
              <MdRestaurantMenu className="text-[#f5f5f5] text-xl sm:text-2xl lg:text-3xl xl:text-4xl" />
              <div className="flex flex-col items-start">
                <h1 className="text-xs sm:text-sm lg:text-base text-[#f5f5f5] font-semibold tracking-wide truncate max-w-[120px] sm:max-w-none">
                  {customerData.customerName || "Customer Name"}
                </h1>
                <p className="text-xs text-[#ababab] font-medium">
                  Table: {customerData.table?.tableNo || "N/A"}
                </p>
              </div>
            </div>
          </div>
          
          {/* MenuContainer - Responsive with proper spacing */}
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
            <div className="space-y-3 sm:space-y-4 pb-4">
              <MenuContainer searchTerm={searchTerm} />
            </div>
          </div>
        </div>
        {/* Right Section - Sidebar on desktop, bottom section on mobile */}
        <div className="w-full lg:w-1/4 bg-[#1a1a1a] rounded-lg p-3 sm:p-4 order-last lg:order-none lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)]">
          <div className="lg:overflow-y-auto lg:max-h-full scrollbar-hide">
            <CustomerInfo />
            <hr className="border-[#2a2a2a] border-t-2 my-3" />
            <CartInfo />
            <hr className="border-[#2a2a2a] border-t-2 my-3" />
            <Bill />
          </div>
        </div>
      </div>
      {/* Bottom Navigation - Fixed on mobile */}
      <div className="lg:relative">
        <BottomNav />
      </div>
    </section>
  );
};

export default Menu;

