import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  Settings,
  HelpCircle,
  Menu,
  ChevronLeft,
  LogOut,
} from 'lucide-react';
import { MdOutlineCalculate, MdOutlineCloudUpload } from 'react-icons/md';
import Cookies from 'js-cookie';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roles = Cookies.get('role');
  const departments = Cookies.get('department');
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { title: 'หน้าหลัก', icon: <Home className="w-5 h-5" />, path: '/' },
    { title: 'การคำนวน', icon: <MdOutlineCalculate className="w-6 h-6" />, path: '/carrental/calculator' },
    { title: 'ผู้ใช้งาน', icon: <Users className="w-5 h-5" />, path: '/employee/dashboard' },
  ];

  // Add the "อัพโหลดไฟล์ราคา" item only if the role is 1
  if (roles === '1') {
    menuItems.push({
      title: 'อัพโหลดไฟล์ราคา',
      icon: <MdOutlineCloudUpload className="w-5 h-5" />,
      path: '/carrental/upload',
    });
  }

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role_id');
    Cookies.remove('department');
    navigate('/login');
  };

  // Check if the current path matches the menu item path
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`flex flex-col ${
        isExpanded ? 'w-64' : 'w-20'
      } h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-all duration-300 shadow-xl`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-700">
        {isExpanded && (
          <div className="flex items-center">
            
            <h1 className="text-xl font-bold text-gray-100">Employee Management</h1>
          </div>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
        >
          {isExpanded ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 pt-5 overflow-y-auto px-3 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`flex items-center w-full p-3 rounded-lg transition-colors ${
              !isExpanded ? 'justify-center' : ''
            } ${
              isActive(item.path)
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => navigate(item.path)}
          >
            <div className={`${isActive(item.path) ? 'text-white' : 'text-gray-400'}`}>
              {item.icon}
            </div>
            {isExpanded && <span className="ml-4 font-medium">{item.title}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-700 p-3">
        <button
          className={`flex items-center w-full p-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors ${
            !isExpanded && 'justify-center'
          }`}
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          {isExpanded && <span className="ml-4 font-medium">ออกจากระบบ</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;