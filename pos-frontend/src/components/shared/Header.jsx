// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import { FaUserCircle } from "react-icons/fa";
// import { FaBell } from "react-icons/fa";
// import logo from "../../assets/images/logo.png";
// import { useDispatch, useSelector } from "react-redux";
// import { IoLogOut } from "react-icons/io5";
// import { useMutation } from "@tanstack/react-query";
// import { logout } from "../../https";
// import { removeUser } from "../../redux/slices/userSlice";
// import { useNavigate } from "react-router-dom";
// import { MdDashboard } from "react-icons/md";

// const Header = () => {
//   const userData = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");

//   const logoutMutation = useMutation({
//     mutationFn: () => logout(),
//     onSuccess: () => {
//       dispatch(removeUser());
//       navigate("/auth");
//     },
//     onError: () => {
//       // No backend, so just remove user
//       dispatch(removeUser());
//       navigate("/auth");
//     },
//   });

//   const handleLogout = () => {
//     logoutMutation.mutate();
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (search.trim()) {
//       navigate("/menu", { state: { search } });
//     }
//   };

//   return (
//     <header className="flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-8 bg-[#1a1a1a] gap-3 sm:gap-0">
//       {/* LOGO */}
//       <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer mb-2 sm:mb-0">
//         <img src={logo} className="h-8 w-8" alt="restro logo" />
//         <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
//           Cafio
//         </h1>
//       </div>

//       {/* SEARCH - Responsive */}
//       <form
//         onSubmit={handleSearch}
//         className="flex items-center gap-2 bg-[#1f1f1f] rounded-[15px] px-3 sm:px-5 py-2 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
//       >
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search menu..."
//           className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full text-sm sm:text-base"
//         />
//         <button type="submit" className="p-2">
//           <FaSearch className="text-[#f5f5f5] text-lg" />
//         </button>
//       </form>

//       {/* LOGGED USER DETAILS */}
//       <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
//         <div
//           onClick={() => navigate("/dashboard")}
//           className="flex items-center gap-2 bg-[#1f1f1f] rounded-[15px] p-2 sm:p-3 cursor-pointer hover:bg-[#262626] transition-colors"
//         >
//           <MdDashboard className="text-[#f5f5f5] text-xl sm:text-2xl" />
//           <span className="text-[#f5f5f5] font-semibold hidden sm:inline">Admin Dashboard</span>
//         </div>
//         <div className="bg-[#1f1f1f] rounded-[15px] p-2 sm:p-3 cursor-pointer">
//           <FaBell className="text-[#f5f5f5] text-xl sm:text-2xl" />
//         </div>
//         <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
//           <FaUserCircle className="text-[#f5f5f5] text-3xl sm:text-4xl" />
//           <div className="flex flex-col items-start">
//             <h1 className="text-sm sm:text-md text-[#f5f5f5] font-semibold tracking-wide">
//               {userData.name || "TEST USER"}
//             </h1>
//             <p className="text-xs text-[#ababab] font-medium">
//               {userData.role || "Role"}
//             </p>
//           </div>
//           <IoLogOut
//             onClick={handleLogout}
//             className="text-[#f5f5f5] ml-2"
//             size={32}
//           />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaBell } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(removeUser());
      navigate("/auth");
    },
    onError: () => {
      dispatch(removeUser());
      navigate("/auth");
    },
  });

  const handleLogout = () => logoutMutation.mutate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate("/menu", { state: { search } });
    }
  };

  return (
    <header className="bg-[#1a1a1a] w-full px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center sm:justify-between gap-3 sm:gap-0">
      {/* Logo Section */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src={logo} alt="restro logo" className="h-8 w-8" />
        <h1 className="text-lg sm:text-xl font-semibold text-[#f5f5f5]">
          Cafio
        </h1>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="w-full sm:w-auto flex-grow sm:flex-grow-0 flex items-center bg-[#1f1f1f] rounded-[15px] px-4 py-2"
      >
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow bg-transparent text-[#f5f5f5] outline-none text-sm sm:text-base placeholder:text-[#888]"
        />
        <button type="submit">
          <FaSearch className="text-[#f5f5f5] text-base sm:text-lg" />
        </button>
      </form>

      {/* User Section */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3">
        {/* Dashboard Shortcut */}
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 bg-[#1f1f1f] px-3 py-2 rounded-[15px] cursor-pointer hover:bg-[#262626] transition-colors"
        >
          <MdDashboard className="text-[#f5f5f5] text-lg sm:text-xl" />
          <span className="hidden sm:inline text-sm sm:text-base font-medium text-[#f5f5f5]">
            Admin Dashboard
          </span>
        </div>

        {/* Notifications */}
        <div className="bg-[#1f1f1f] p-2 rounded-[15px] cursor-pointer">
          <FaBell className="text-[#f5f5f5] text-lg sm:text-xl" />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-[#f5f5f5] text-2xl sm:text-3xl" />
          <div className="flex flex-col leading-tight">
            <h1 className="text-sm sm:text-base text-[#f5f5f5] font-semibold">
              {userData.name || "TEST USER"}
            </h1>
            <p className="text-xs sm:text-sm text-[#ababab]">
              {userData.role || "Role"}
            </p>
          </div>
          <IoLogOut
            onClick={handleLogout}
            className="text-[#f5f5f5] text-xl ml-2"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

