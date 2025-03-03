import React, { useMemo } from "react";
import { Card } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Users, Eye, Edit, Trash, Bell, Search, Settings } from "lucide-react";

const Dashboard_View = () => {
  // Mockup employee data
  const employees = [
    {
      id: 1,
      name: "สมชาย ใจดี",
      department: "วิศวกรรม",
      
      email: "somchai@company.com",
      phone: "081-234-5678",
      hireDate: "2020-05-15",
      salary: 45000,
      status: "Active",
    },
    {
      id: 2,
      name: "สมหญิง รักเรียน",
      department: "การตลาด",

      email: "somying@company.com",
      phone: "089-876-5432",
      hireDate: "2019-10-22",
      salary: 52000,
      status: "Active",
    },
    {
      id: 3,
      name: "ประสิทธิ์ มานะ",
      department: "การเงิน",
     
      email: "prasit@company.com",
      phone: "064-555-4444",
      hireDate: "2021-03-10",
      salary: 38000,
      status: "Active",
    },
    {
      id: 4,
      name: "วิภา จริงใจ",
      department: "ทรัพยากรบุคคล",
      
      email: "wipa@company.com",
      phone: "092-123-7890",
      hireDate: "2018-11-05",
      salary: 58000,
      status: "Active",
    },
    {
      id: 5,
      name: "ธนา ฟ้าใส",
      department: "วิศวกรรม",
     
      email: "thana@company.com",
      phone: "086-999-8888",
      hireDate: "2022-01-20",
      salary: 42000,
      status: "Active",
    },
    // เพิ่มตัวอย่างข้อมูลเพื่อให้มีความหลากหลายของแผนกมากขึ้น
    {
      id: 6,
      name: "ปรีชา มั่นคง",
      department: "ขาย",
      
      email: "preecha@company.com",
      phone: "082-333-4444",
      hireDate: "2021-06-15",
      salary: 40000,
      status: "Active",
    },
  ];

  // Department color mapping
  const departmentColorMap = {
    "วิศวกรรม": {
      color: "bg-indigo-500",
      textColor: "text-indigo-500",
      bgLight: "bg-indigo-100",
    },
    "การตลาด": {
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
      bgLight: "bg-emerald-100",
    },
    "การเงิน": {
      color: "bg-amber-500",
      textColor: "text-amber-500",
      bgLight: "bg-amber-100",
    },
    "ทรัพยากรบุคคล": {
      color: "bg-rose-500",
      textColor: "text-rose-500",
      bgLight: "bg-rose-100",
    },
    "ขาย": {
      color: "bg-blue-500",
      textColor: "text-blue-500",
      bgLight: "bg-blue-100",
    },
  };

  // Calculate department statistics dynamically from employee data
  const departmentStats = useMemo(() => {
    const totalEmployees = employees.length;
    
    // Count employees by department
    const departmentCounts = employees.reduce((acc, employee) => {
      const dept = employee.department;
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});
    
    // Create department summary array with calculated percentages
    return Object.entries(departmentCounts).map(([name, count]) => {
      const percent = Math.round((count / totalEmployees) * 100);
      return {
        name,
        count,
        percent,
        ...departmentColorMap[name]
      };
    });
  }, [employees]);

  // Total employee count
  const totalEmployees = employees.length;

  // Department Summary Card component
  const DepartmentSummaryCard = ({ department }) => {
    return (
      <div
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 border-l-4"
        style={{
          borderLeftColor: department.color.replace("bg-", "").split("-")[0],
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className={`font-medium ${department.textColor}`}>
            {department.name}
          </h3>
          <div
            className={`w-8 h-8 rounded-full ${department.bgLight} flex items-center justify-center`}
          >
            <Users className={department.textColor} size={16} />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold">{department.count}</p>
            <p className="text-xs text-gray-500">พนักงาน</p>
          </div>
          <div className="text-sm text-gray-500">
            {department.percent}% ของทั้งหมด
          </div>
        </div>
      </div>
    );
  };

  // Columns for the DataGrid
  const columns = [
    { field: "name", headerName: "พนักงาน", flex: 1 },
    { field: "department", headerName: "แผนก", flex: 1 },
    { field: "email", headerName: "อีเมล", flex: 1 },
    { field: "phone", headerName: "เบอร์โทร", flex: 1 },
    { field: "hireDate", headerName: "วันที่เริ่มงาน", flex: 1 },
    {
      field: "actions",
      headerName: "การดำเนินการ",
      flex: 1,
      renderCell: (params) => (
        <div className="flex space-x-2 justify-center items-center">
          <button className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
            <Eye size={18} />
          </button>
          <button className="p-1 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors">
            <Edit size={18} />
          </button>
          <button className="p-1 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors">
            <Trash size={18} />
          </button>
        </div>
      ),
    }
  ];
  

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
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

      {/* Main content */}
      <main className="m-4">
       
          {/* Department summary cards - now using real calculated data */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              สรุปจำนวนพนักงานแต่ละแผนก
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {departmentStats.map((department, index) => (
                <DepartmentSummaryCard key={index} department={department} />
              ))}
            </div>
          </div>

          {/* Employee table using MUI DataGrid */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">ภาพรวมพนักงาน ({totalEmployees} คน)</h2>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                + เพิ่มพนักงานใหม่
              </button>
            </div>
            <div className="p-6">
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={employees}
                  columns={columns}
                  pageSize={5}
                />
              </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default Dashboard_View;