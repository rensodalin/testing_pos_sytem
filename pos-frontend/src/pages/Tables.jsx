import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { useQuery } from "@tanstack/react-query";
import { getTables } from "../https";
import { enqueueSnackbar } from "notistack";

const Tables = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Tables";
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const res = await getTables();
      return res.data;
    },
  });

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Failed to load tables", { variant: "error" });
    }
  }, [isError]);

  if (isLoading) {
    return (
      <section className="bg-[#1f1f1f] min-h-screen flex flex-col items-center justify-center">
        <p className="text-[#ccc] text-lg">Loading tables...</p>
      </section>
    );
  }

  const allTables = data || [];
  const filteredTables =
    status === "all"
      ? allTables
      : allTables.filter((table) =>
          (table.status || "available").toLowerCase() === status.toLowerCase()
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
                key={table.id || table._id || table.tableNo}
                id={table.id || table._id || table.tableNo}
                name={table.tableNo}
                status={table.status || "Available"}
                initials={table.initial || ""}
                seats={table.seats}
              />
            ))
          ) : (
            <p className="text-[#ccc] col-span-full text-center mt-10">
              No tables found for status: {" "}
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

