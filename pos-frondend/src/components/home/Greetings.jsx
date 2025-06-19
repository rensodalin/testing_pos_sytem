import React, { useState, useEffect } from 'react';

const Greetings = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  const formatDate = (date) =>
    `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;

  return (
    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-8 mt-5'>
      <div>
        <h1 className='text-[#f5f5f5] text-xl sm:text-2xl font-semibold tracking-wide'>
          Good Morning , Dalin
        </h1>
        <p className='text-[#ababab] text-sm sm:text-base mt-2'>{formatDate(dateTime)}</p>
      </div>
      <div className='mt-4 sm:mt-0'>
        <h1 className='text-[#f5f5f5] text-xl sm:text-2xl font-semibold'>{formatTime(dateTime)}</h1>
      </div>
    </div>
  );
};

export default Greetings;
