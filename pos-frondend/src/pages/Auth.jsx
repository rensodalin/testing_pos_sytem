import React, { useState } from 'react';
import coffee from '../assets/images/caffee-img.jpg'; // fixed import name
import logo from '../assets/images/logo.png'; // fixed import name
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
function Auth() {

  const [isRegister, setIsRegister] = useState(false);
  return (
    <div className='flex min-h-screen w-full'>
      {/* left section  */}
      <div className='relative w-1/2'>
        <img
          src={coffee}
          alt="coffee image"
          className='w-full h-full object-cover'
        />
        {/* black overlay */}
        <div className='absolute inset-0 bg-black bg-opacity-80'></div>

        {/* quote at bottom */}
        <blockquote className='absolute bottom-10 left-0 right-0 px-8 text-2xl italic text-white'>
          "Serve customers the best drink and food with prompt and friendly service in a welcoming atmosphere, and they'll keep coming back."
          <br />
          <span className='block mt-4 text-yellow-400'>- founder of Cafio</span>
        </blockquote>
      </div>

      {/* right section */}
      <div className='w-2/3 min-h-screen bg-[#1a1a1a] p-10'>
        <div className='flex flex-col items-center gap-2'>
          <img src={logo} alt="cafio logo" className='h-14 w-14 border-2 rounded-full
          p-1' />
          <h1 className='text-lg font-semibold text=[#f5f5f5] tracking-wide'>Cafio</h1>
        </div>

        <h2 className='text-4xl text-center mt-4 font-semibold text-yellow-400 mb-10'>{isRegister ? "Emplooyee Registration " : " Employee login"}</h2>
        {/* componet */}
        {isRegister ? <Register setIsRegister={setIsRegister}/> : <Login/> }
      
        <div className='flex justify-center mt-6'>
          <p className='text-sm text-[#ababab]'>
            {isRegister ? "Already have an accunt ? " : "Don't have an account ? "}
            <a onClick={() => setIsRegister(!isRegister)} className='text-yellow-400 font-semibold hover:underline' href='#'> {isRegister ? " Sign in " : " Sign up"}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
