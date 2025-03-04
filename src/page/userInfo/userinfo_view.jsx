import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import employeesData from "../../data/employee.json"; // Import the JSON file

const UserInfo_View = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeId: "",
    password: "",
    firstName: "",
    lastName: "",
    department: "",
    email: "",
    phone: "",
    hireDate: null,
  });

  useEffect(() => {
    if (id) {
      const employee = employeesData.find((emp) => emp.id === parseInt(id));
      if (employee) {
        setFormData({
          employeeId: employee.id,
          password: "", // Password should not be pre-filled for security reasons
          firstName: employee.name.split(" ")[0],
          lastName: employee.name.split(" ")[1],
          department: employee.department,
          email: employee.email,
          phone: employee.phone,
          hireDate: null, // Assuming hireDate is not available in the JSON data
        });
      }
    }
  }, [id]);

  return (
    <Container maxWidth={false}>
      <Paper sx={{ p: 4, mt: 4, width: "100%" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ข้อมูลพนักงาน
        </Typography>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            {/* Form Fields */}
            <Grid item xs={12} md={6}>
              <Typography marginBottom={1}>รหัสพนักงาน</Typography>
              <TextField
                required
                fullWidth
                id="employeeId"
                label="รหัสพนักงาน"
                name="employeeId"
                value={formData.employeeId}
                size="small"
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography marginBottom={1}>รหัสผ่าน</Typography>
              <TextField
                required
                fullWidth
                id="password"
                label="รหัสผ่าน"
                name="password"
                type="password"
                value={formData.password}
                size="small"
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography marginBottom={1}>ชื่อจริง</Typography>
              <TextField
                required
                fullWidth
                id="firstName"
                label="ชื่อจริง"
                name="firstName"
                value={formData.firstName}
                size="small"
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography marginBottom={1}>นามสกุล</Typography>
              <TextField
                required
                fullWidth
                id="lastName"
                label="นามสกุล"
                name="lastName"
                value={formData.lastName}
                size="small"
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography marginBottom={1}>แผนก</Typography>
              <TextField
                required
                fullWidth
                id="department"
                label="แผนก"
                name="department"
                value={formData.department}
                size="small"
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography marginBottom={1}>อีเมล</Typography>
              <TextField
                required
                fullWidth
                id="email"
                label="อีเมล"
                name="email"
                type="email"
                value={formData.email}
                size="small"
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography marginBottom={1}>เบอร์โทร</Typography>
              <TextField
                required
                fullWidth
                id="phone"
                label="เบอร์โทร"
                name="phone"
                value={formData.phone}
                size="small"
                disabled
              />
            </Grid>

            {/* Buttons */}
            <Grid
              item
              xs={12}
              sx={{ mt: 2 }}
              container
              justifyContent="end"
              alignItems="center"
            >
              <Grid item marginX={1}>
                <Button
                  variant="outlined"
                  color="black"
                  size="large"
                  sx={{ fontWeight: "bold" }}
                  onClick={() => navigate(-1)}
                >
                  กลับ
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserInfo_View;
