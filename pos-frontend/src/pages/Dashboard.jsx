import React, { useState, useEffect } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import Modal from "../components/dashboard/Modal";
import BackButton from "../components/shared/BackButton";

const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payments"];

const Dashboard = () => {
  useEffect(() => {
    document.title = "POS | Admin Dashboard";
  }, []);

  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("table");
  const [activeTab, setActiveTab] = useState("Metrics");

  const handleOpenModal = (action) => {
    setModalAction(action);
    setIsTableModalOpen(true);
  };

  return (
    <div className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] overflow-x-hidden">
      {/* Header with Back Button */}
      <div className="container mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-bold tracking-wider">
            Admin Dashboard
          </h1>
        </div>
      </div>

      {/* Controls Section - Responsive Layout */}
      <div className="container mx-auto px-4 sm:px-6 pb-4 sm:pb-8">
        {/* Mobile Layout - Stacked */}
        <div className="flex flex-col gap-4 lg:hidden">
          {/* Action Buttons - Mobile */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {buttons.map(({ label, icon, action }) => {
              return (
                <button
                  key={label}
                  onClick={() => handleOpenModal(action)}
                  className="bg-[#1a1a1a] hover:bg-[#262626] px-4 sm:px-6 py-3 rounded-lg text-[#f5f5f5] font-semibold text-sm sm:text-md flex items-center justify-center gap-2 transition-colors w-full sm:flex-1"
                >
                  {icon} <span className="whitespace-nowrap">{label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Buttons - Mobile */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              return (
                <button
                  key={tab}
                  className={`
                  px-4 sm:px-6 py-3 rounded-lg text-[#f5f5f5] font-semibold text-sm sm:text-md flex items-center gap-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab
                      ? "bg-[#262626]"
                      : "bg-[#1a1a1a] hover:bg-[#262626]"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-3">
            {buttons.map(({ label, icon, action }) => {
              return (
                <button
                  key={label}
                  onClick={() => handleOpenModal(action)}
                  className="bg-[#1a1a1a] hover:bg-[#262626] px-6 xl:px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2 transition-colors"
                >
                  {icon} <span className="whitespace-nowrap">{label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {tabs.map((tab) => {
              return (
                <button
                  key={tab}
                  className={`
                  px-6 xl:px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2 transition-colors ${
                    activeTab === tab
                      ? "bg-[#262626]"
                      : "bg-[#1a1a1a] hover:bg-[#262626]"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Section - Responsive */}
      <div className="container mx-auto px-4 sm:px-6">
        {activeTab === "Metrics" && <Metrics />}
        {activeTab === "Orders" && <RecentOrders />}
        {activeTab === "Payments" && (
          <div className="text-white p-4 sm:p-6 text-center">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Payment Component Coming Soon</h2>
            <p className="text-sm sm:text-base text-[#ababab]">This feature is currently under development.</p>
          </div>
        )}
      </div>

      {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} action={modalAction} />}
    </div>
  );
};

export default Dashboard;
