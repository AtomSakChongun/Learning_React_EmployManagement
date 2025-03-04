import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

const LoginInfoBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto mb-4 rounded-lg border border-blue-500 overflow-hidden">
      <button 
        className="w-full flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 transition-colors focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Info className="mr-2 h-5 w-5" />
          <span className="font-medium">ข้อมูลการล็อกอิน</span>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      
      {isOpen && (
        <div className="bg-gray-800 p-4 text-white">
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-300">อีเมลที่ใช้ล็อกอิน:</h3>
              <div className="bg-gray-700 p-2 rounded mt-1 flex items-center">
                <code className="text-blue-300">admin@email.com</code>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300">รหัสผ่าน:</h3>
              <div className="bg-gray-700 p-2 rounded mt-1 flex items-center">
                <code className="text-blue-300">password</code>
              </div>
            </div>
            
            <div className="pt-2 text-xs text-gray-400">
              <p>* ใช้ข้อมูลนี้เพื่อเข้าสู่ระบบสำหรับการทดสอบเท่านั้น</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginInfoBox;