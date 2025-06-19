import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import logo from "../../assets/images/logo.png";


const Header = () => {

  return (
    <header className="flex flex-col md:flex-row justify-between items-center py-4 px-4 md:px-8 bg-[#202a3e] space-y-4 md:space-y-0">
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <img src={logo} className="h-8 w-8" alt="cafio logo" />
        <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">Cafio</h1>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-4 bg-[#2b3447] rounded-[15px] px-5 py-2 w-full md:w-[500px]">
        <FaSearch className="text-[#f5f5f5]" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-[#2b3447] outline-none text-[#f5f5f5]"
        />
      </div>

      {/* LOGGED USER DETAILS */}
      <div className="flex items-center gap-4">
        <div className="bg-[#2e3e42] rounded-[15px] p-3 cursor-pointer">
          <FaBell className="text-[#f5f5f5] text-2xl" />
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <FaUserCircle className="text-[#f5f5f5] text-4xl" />
          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
             Ren Sodalin
            </h1>
            <p className="text-xs text-[#ababab] font-medium">
            Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

