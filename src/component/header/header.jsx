import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ title }) => {
  return (
    <div>
      <header className="bg-gray-700 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold">
              AD
            </div>
          </div>
        </div>
      </header>
      <div className="bg-red-700 shadow-md">
        <div className="container mx-auto px-2 py-2 flex justify-between items-center">
          <h1 className="text-white">This project uses mock data for demonstration purposes. No actual database connection is required to test the functionality</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
