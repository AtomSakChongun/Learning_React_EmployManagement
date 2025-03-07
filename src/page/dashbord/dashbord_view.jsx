import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  InputAdornment,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Users, Eye, Edit, Trash, Search, Download } from "lucide-react";
import * as XLSX from "xlsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import employeesData from "../../data/employee.json"; // Import the JSON file
import TextFieldCustom from "../../component/textfieldcustom/textfieldcustom";

const Dashboard_View = () => {
  const navigate = useNavigate();
  const role = Cookies.get("role");
  const token = Cookies.get("token");
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState(employeesData);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    id: null,
    name: "",
    department: "",
    email: "",
    phone: "",
    salary: "",
    status: "Active",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter(
      (emp) =>
        emp.name.includes(search) ||
        emp.department.includes(search) ||
        emp.email.includes(search) ||
        emp.phone.includes(search)
    );
  }, [search, employees]);

  // Export ข้อมูลเป็น Excel หรือ CSV
  const exportData = () => {
    const ws = XLSX.utils.json_to_sheet(filteredEmployees);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employees");
    XLSX.writeFile(wb, "employees.xlsx");
  };

  // Department color mapping
  const departmentColorMap = {
    วิศวกรรม: {
      color: "bg-indigo-500",
      textColor: "text-indigo-500",
      bgLight: "bg-indigo-100",
    },
    การตลาด: {
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
      bgLight: "bg-emerald-100",
    },
    การเงิน: {
      color: "bg-amber-500",
      textColor: "text-amber-500",
      bgLight: "bg-amber-100",
    },
    ทรัพยากรบุคคล: {
      color: "bg-rose-500",
      textColor: "text-rose-500",
      bgLight: "bg-rose-100",
    },
    ขาย: {
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
        ...departmentColorMap[name],
      };
    });
  }, [employees]);

  // Total employee count
  const totalEmployees = employees.length;

  // Department Summary Card component
  const DepartmentSummaryCard = ({ department }) => {
    return (
      <Card
        className="p-4 border-l-4"
        style={{ borderLeftColor: department.color }}
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
      </Card>
    );
  };

  // Columns for the DataGrid
  const columns = [
    { field: "name", headerName: "พนักงาน", flex: 1 },
    { field: "department", headerName: "แผนก", flex: 1 },
    { field: "email", headerName: "อีเมล", flex: 1 },
    { field: "phone", headerName: "เบอร์โทร", flex: 1 },
    { field: "salary", headerName: "เงินเดือน", flex: 1 },
    {
      field: "actions",
      headerName: "การดำเนินการ",
      flex: 1,
      renderCell: (params) => (
        <div className="flex space-x-2 justify-center items-center">
          <button
            className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
            onClick={() => handleView(params.row.id)}
          >
            <Eye size={18} />
          </button>
          <button
            className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
            onClick={() => handleEdit(params.row)}
          >
            <Edit size={18} />
          </button>
          <button
            className="p-1 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
            onClick={() => handleDelete(params.row.id)}
          >
            <Trash size={18} />
          </button>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setCurrentEmployee({
      id: null,
      name: "",
      department: "",
      email: "",
      phone: "",
      salary: "",
      status: "Active",
    });
    setOpenDialog(true);
  };

  const handleView = (id) => {
    navigate(`/user-info/view/${id}`);
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleSave = () => {
    if (currentEmployee.id) {
      setEmployees(
        employees.map((employee) =>
          employee.id === currentEmployee.id ? currentEmployee : employee
        )
      );
    } else {
      const newEmployee = {
        ...currentEmployee,
        id: employees.length + 1,
      };
      setEmployees([...employees, newEmployee]);
    }
    setOpenDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main content */}
      <main className="m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">📊 ภาพรวมพนักงาน</h2>
          <Button
            onClick={exportData}
            variant="contained"
            color="primary"
            startIcon={<Download size={20} />}
          >
            Export
          </Button>
        </div>
        {/* Department summary cards - now using real calculated data */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {departmentStats.map((department, index) => (
              <DepartmentSummaryCard key={index} department={department} />
            ))}
          </div>
        </div>

        <Card className="p-2 mb-4 shadow-sm rounded-xl">
          {/* ช่องค้นหาพนักงาน */}
          <TextFieldCustom
            title="ค้นหาพนักงาน..."
            value={search}
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Card>

        {/* Employee table using MUI DataGrid */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">
              ภาพรวมพนักงาน ({totalEmployees} คน)
            </h2>
            <div className="flex justify-end mb-4">
              <Button onClick={handleAdd} variant="contained" color="primary">
                + เพิ่มพนักงานใหม่
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={filteredEmployees}
                columns={columns}
                pageSize={5}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Dialog for adding/editing employee */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {currentEmployee.id ? "Edit Employee" : "Add Employee"}
        </DialogTitle>
        <DialogContent>
          <TextFieldCustom
            title="Name"
            name="name"
            value={currentEmployee.name}
            onChange={(e) =>
              setCurrentEmployee({ ...currentEmployee, name: e.target.value })
            }
          />
          <TextFieldCustom
            title="Department"
            name="department"
            value={currentEmployee.department}
            onChange={(e) =>
              setCurrentEmployee({
                ...currentEmployee,
                department: e.target.value,
              })
            }
          />
          <TextFieldCustom
            title="Email"
            name="email"
            type="email"
            value={currentEmployee.email}
            onChange={(e) =>
              setCurrentEmployee({ ...currentEmployee, email: e.target.value })
            }
          />
          <TextFieldCustom
            title="Phone"
            name="phone"
            value={currentEmployee.phone}
            onChange={(e) =>
              setCurrentEmployee({ ...currentEmployee, phone: e.target.value })
            }
          />
          <TextFieldCustom
            title="Salary"
            name="salary"
            type="number"
            value={currentEmployee.salary}
            onChange={(e) =>
              setCurrentEmployee({ ...currentEmployee, salary: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard_View;
