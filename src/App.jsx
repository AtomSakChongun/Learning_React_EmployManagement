import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Dashbord_View from "./page/dashbord/dashbord_view";
import UserInfo_View from "./page/userInfo/userinfo_view";
import LoginView from "./page/authen/login_view";
import Sidebar from "./component/sidebar/sidebar";
import "./App.css";

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* แสดง Sidebar เฉพาะเมื่อไม่ใช่หน้า Login */}
      {!isLoginPage && <Sidebar />}

      <div className="flex-1 overflow-auto bg-gray-100">
        {/* แสดง Header เฉพาะเมื่อไม่ใช่หน้า Login */}
        {!isLoginPage && (
          <header className="bg-gray-700 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">แดชบอร์ดพนักงาน</h1>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold">
                  AD
                </div>
              </div>
            </div>
          </header>
        )}

        {/* กำหนด Routes */}
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/" element={<Dashbord_View />} />
          <Route path="/user-info" element={<UserInfo_View />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
