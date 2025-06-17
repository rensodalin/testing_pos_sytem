import React from 'react'
import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
const OrderCard = () => {
  return (
    <div className="w-full bg-[#2a2a2a] p-4 rounded-xl text-[#f5f5f5] shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-500 text-black font-bold rounded-md px-3 py-2">AM</div>
          <div>
            <h2 className="text-lg font-semibold">Ren sodalin</h2>
            <p className="text-sm text-gray-400">#101 / Dine in</p>
          </div>
        </div>
        <div className="text-green-400 font-bold border border-green-600 rounded-lg px-2 py-1 text-sm">Ready</div>
      </div>

      <div className="text-sm text-gray-300 mb-2">Ready to serve</div>
      <div className="flex justify-between text-sm text-gray-400">
        <span>January 18, 2025 08:32 PM</span>
        <span>8 items</span>
      </div>
      <hr className="my-2 border-gray-600" />
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span className="text-white">$250.00</span>
      </div>
    </div>
  )
}

export default OrderCard
