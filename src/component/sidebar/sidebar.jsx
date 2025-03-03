import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const roles = Cookies.get('role'); // Get the role from cookies
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

  return (
    <div
      className={`flex flex-col ${isExpanded ? 'w-56' : 'w-20'} h-full bg-gray-800 text-white transition-all duration-300 shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isExpanded && <h1 className="text-xl font-bold">Employee Management</h1>}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isExpanded ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 pt-4 overflow-y-auto">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`flex items-center w-full p-4 hover:bg-gray-700 transition-colors ${!isExpanded && 'justify-center'}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {isExpanded && <span className="ml-4">{item.title}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-700">
        <button
          className={`flex items-center w-full p-4 hover:bg-gray-700 transition-colors ${!isExpanded && 'justify-center'}`}
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          {isExpanded && <span className="ml-4">ออกจากระบบ</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;