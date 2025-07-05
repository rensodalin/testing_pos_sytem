import React, { useEffect, useState } from "react";
import restaurant from "../assets/images/restaurant-img.jpg";
import logo from "../assets/images/logo.png";
import CustomerRegister from "../components/auth/CustomerRegister";
import CustomerLogin from "../components/auth/CustomerLogin";

const CustomerAuth = () => {
  useEffect(() => {
    document.title = "Cafio | Customer Auth";
  }, []);

  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section */}
      <div className="w-1/2 relative flex items-center justify-center bg-cover">
        {/* BG Image */}
        <img className="w-full h-full object-cover" src={restaurant} alt="Restaurant Image" />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

        {/* Quote at bottom */}
        <blockquote className="absolute bottom-10 px-8 mb-10 text-2xl italic text-white">
          "Experience the finest coffee and cuisine delivered right to your doorstep."
          <br />
          <span className="block mt-4 text-yellow-400">- Cafio Team</span>
        </blockquote>
      </div>

      {/* Right Section */}
      <div className="w-1/2 min-h-screen bg-[#1a1a1a] p-10">
        <div className="flex flex-col items-center gap-2">
          <img src={logo} alt="Cafio Logo" className="h-14 w-14 border-2 rounded-full p-1" />
          <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">Cafio</h1>
        </div>

        <h2 className="text-4xl text-center mt-10 font-semibold text-yellow-400 mb-10">
          {isRegister ? "Customer Registration" : "Customer Login"}
        </h2>

        {/* Components */}
        {isRegister ? <CustomerRegister setIsRegister={setIsRegister} /> : <CustomerLogin setIsRegister={setIsRegister} />}

        {/* Toggle between login and register */}
        <div className="text-center mt-6">
          <p className="text-[#ababab]">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-yellow-400 ml-2 hover:underline"
            >
              {isRegister ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>

        {/* Back to main auth */}
        <div className="text-center mt-4">
          <button
            onClick={() => window.history.back()}
            className="text-[#ababab] hover:text-yellow-400 text-sm"
          >
            ← Back to main login
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerAuth; 