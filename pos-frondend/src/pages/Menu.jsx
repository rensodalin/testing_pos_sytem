import React from 'react'
import BottomNav from '../components/shared/BottomNav'
import BackButton from '../components/shared/BackButton'
import { IoIosCafe } from "react-icons/io";
import MenuContainer from '../components/menu/MenuContainer';
const Menu = () => {
  return (
    <section className='bg-[#202a3e]  h-[calc(100vh-5rem)] overflow-y-auto flex gap-3'>
    <div className='flex-[3]'>
    <div className="flex items-center justify-between px-10 py-4">
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
             Customer Name 
            </h1>
            <p className="text-xs text-[#ababab] font-medium">
            Table No :
            </p>
          </div>
        </div>
        </div>
      </div>
      <MenuContainer />
    </div>
    <div className='flex-[1] bg-blue-500'></div>

      <BottomNav />
    </section>
  )
}

export default Menu
