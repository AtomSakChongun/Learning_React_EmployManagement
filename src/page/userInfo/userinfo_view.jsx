import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import employeesData from "../../data/employee.json"; // Import the JSON file
import TextFieldCustom from "../../component/textfieldcustom/textfieldcustom";

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
              <TextFieldCustom
                title="รหัสพนักงาน"
                value={formData.employeeId}
                name="employeeId"
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldCustom
                title="รหัสผ่าน"
                name="password"
                type="password"
                value={formData.password}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldCustom
                title="ชื่อจริง"
                name="firstName"
                value={formData.firstName}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldCustom
                title="นามสกุล"
                name="lastName"
                value={formData.lastName}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldCustom
                title="แผนก"
                name="department"
                value={formData.department}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldCustom
                title="อีเมล"
                name="email"
                type="email"
                value={formData.email}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldCustom
                title="เบอร์โทร"
                name="phone"
                value={formData.phone}
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
