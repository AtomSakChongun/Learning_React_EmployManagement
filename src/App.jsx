import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashbord_View from "./page/dashbord/dashbord_view";
import UserInfo_View from "./page/userInfo/userinfo_view";
import Sidebar from "./component/sidebar/sidebar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto bg-gray-100">
          <header className="bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">แดชบอร์ดพนักงาน</h1>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold">
                  AD
                </div>
              </div>
            </div>
          </header>
          <Routes>
            <Route path="/" element={<Dashbord_View />} />
            <Route path="/user-info" element={<UserInfo_View />} />
            <Route path="/employee/dashboard" element={<UserInfo_View />} />
            <Route path="/carrental/calculator" element={<Dashbord_View />} />
            {/* Add this route only if you have the component */}
            <Route path="/carrental/upload" element={<Dashbord_View />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
