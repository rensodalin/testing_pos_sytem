import React, { useEffect, useState } from "react";
import { popularDishes as staticDishes } from "../../constants";
import { getOrders } from "../../https";

const PopularDishes = () => {
  const [dishStats, setDishStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrders();
        const orders = Array.isArray(response.data) ? response.data : [];

        // Tally order counts by drink name
        const drinkCounts = {};
        for (const order of orders) {
          if (Array.isArray(order.items)) {
            for (const item of order.items) {
              if (!drinkCounts[item.name]) {
                drinkCounts[item.name] = 0;
              }
              drinkCounts[item.name] += item.quantity;
            }
          }
        }

        // Map static dish list and match with counts
        const updatedDishes = staticDishes.map((dish) => ({
          ...dish,
          numberOfOrders: drinkCounts[dish.name] || 0,
        }));

        setDishStats(updatedDishes);
      } catch (error) {
        console.error("Error fetching order data:", error);
        setDishStats(staticDishes); // fallback
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-6 pr-6">
      <div className="bg-[#1a1a1a] w-full rounded-lg">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Popular Dishes
          </h1>
          <a href="#" className="text-[#025cca] text-sm font-semibold">
            View all
          </a>
        </div>

        <div className="overflow-y-scroll h-[680px] scrollbar-hide">
          {dishStats.map((dish, index) => (
            <div
              key={dish.id}
              className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mt-4 mx-6"
            >
              <h1 className="text-[#f5f5f5] font-bold text-xl mr-4">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </h1>
              <img
                src={dish.image}
                alt={dish.name}
                className="w-[50px] h-[50px] rounded-full"
              />
              <div>
                <h1 className="text-[#f5f5f5] font-semibold tracking-wide">
                  {dish.name}
                </h1>
                <p className="text-[#f5f5f5] text-sm font-semibold mt-1">
                  <span className="text-[#ababab]">Orders: </span>
                  {dish.numberOfOrders}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
