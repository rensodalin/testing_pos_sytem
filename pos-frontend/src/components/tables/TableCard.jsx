import React from "react";
import { useNavigate } from "react-router-dom";
import { getAvatarName, getBgColor } from "../../utils";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";
import { FaLongArrowAltRight } from "react-icons/fa";

const TableCard = ({ id, name, status, initials, seats }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (status === "Booked") return;
    
    // Assign table to customer
    const table = { tableId: id, tableNo: name };
    dispatch(updateTable({ table }));
    
    // Navigate to menu
    navigate(`/menu`);
  };

  return (
    <div
      onClick={handleClick}
      key={id}
      className="w-full max-w-[240px] sm:w-[45%] md:w-[48%] lg:w-[220px] xl:w-[240px] bg-[#262626] hover:bg-[#2c2c2c] p-4 rounded-lg cursor-pointer transition duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-[#f5f5f5] text-sm sm:text-base font-semibold flex items-center gap-1">
          Table <FaLongArrowAltRight className="text-[#ababab]" /> {name}
        </h1>
        <p
          className={`px-2 py-[2px] rounded-md text-[10px] sm:text-xs font-medium ${
            status === "Booked"
              ? "text-green-600 bg-[#2e4a40]"
              : "text-yellow-200 bg-[#664a04]"
          }`}
        >
          {status}
        </p>
      </div>

      {/* Avatar */}
      <div className="flex justify-center my-3">
        <div
          className="rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-white text-sm sm:text-base"
          style={{ backgroundColor: initials ? getBgColor() : "#1f1f1f" }}
        >
          {getAvatarName(initials) || "N/A"}
        </div>
      </div>

      {/* Seat Info */}
      <p className="text-[#ababab] text-xs sm:text-sm text-center">
        Seats: <span className="text-[#f5f5f5] font-semibold">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;

