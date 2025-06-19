import React from 'react';
import BottomNav from '../components/shared/BottomNav';
import Greetings from '../components/home/Greetings';
import MiniCard from '../components/home/MiniCard';
import { BsCashCoin } from 'react-icons/bs';
import { GrInProgress } from 'react-icons/gr';
import RecentOrders from '../components/home/RecentOrders';
import PopularDishes from '../components/home/PopularDishes';


const Home = () => {
  return (
    <section className="bg-[#202a3e] h-screen flex flex-col lg:flex-row gap-3 p-4 overflow-y-auto pb-24 lg:pb-4 lg:overflow-hidden">
      {/* Left Div */}
      <div className="w-full lg:flex-[3] lg:overflow-y-auto lg:pb-20">
        <Greetings />
        <div className="flex items-center w-full gap-3 px-8 mt-8">
          <MiniCard title="Total Earnings" icon={<BsCashCoin />} number={512} footerNum={1.6} />
          <MiniCard title="In Progress" icon={<GrInProgress />} number={16} footerNum={3.6} />
        </div>
        <RecentOrders />
      </div>
      {/* Right Div */}
      <div className="w-full lg:flex-[2] lg:overflow-y-auto lg:pb-20">
        <PopularDishes />
      </div>
      <BottomNav />
    </section>
  );
};

export default Home;

