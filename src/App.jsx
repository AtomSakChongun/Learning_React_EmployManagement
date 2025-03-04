import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Dashbord_View from "./page/dashbord/dashbord_view";
import UserInfo_View from "./page/userInfo/userinfo_view";
import LoginView from "./page/authen/login_view";
import Sidebar from "./component/sidebar/sidebar";
import "./App.css";
import Header from "./component/header/header";

function Layout() {
  const location = useLocation();

  // ฟังก์ชันที่จะเปลี่ยน title ตาม path
  const getHeaderTitle = (path) => {
    if (path.startsWith("/user-info/view")) {
      return "View User Information";
    }
    if (path.startsWith("/user-info/edit")) {
      return "Edit User Information";
    }
    switch (path) {
      case "/":
        return "Dashboard";
      case "/user-info":
        return "User Information";
      case "/user-info/create":
        return "Create User Information";
      case "/login":
        return "";  // ไม่แสดง header ในหน้า login
      default:
        return "Employee Management";
    }
  };

  const isLoginPage = location.pathname === "/login";
  const headerTitle = getHeaderTitle(location.pathname);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* แสดง Sidebar เฉพาะเมื่อไม่ใช่หน้า Login */}
      {!isLoginPage && <Sidebar />}

      <div className="flex-1 overflow-auto bg-gray-100">
        {/* แสดง Header เฉพาะเมื่อไม่ใช่หน้า Login */}
        {!isLoginPage && <Header title={headerTitle} />}

        {/* กำหนด Routes */}
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/" element={<Dashbord_View />} />
          <Route path="/user-info/*" element={<UserInfoRoutes />} />
        </Routes>
      </div>
    </div>
  );
}

function UserInfoRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserInfo_View />} />
      <Route path="create" element={<UserInfo_View />} />
      <Route path="view/:id" element={<UserInfo_View />} />
      <Route path="edit/:id" element={<UserInfo_View />} />
    </Routes>
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
