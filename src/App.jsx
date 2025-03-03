import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashbord_View from './page/dashbord/dashbord_view';
import UserInfo_View from './page/userInfo/userinfo_view';
import Sidebar from './component/sidebar/sidebar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto bg-gray-100">
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