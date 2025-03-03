import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  Card,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { th } from "date-fns/locale";

const UserInfo_View = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      hireDate: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <Container maxWidth={false}>
      <Paper sx={{ p: 4, mt: 4, width: "100%" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ข้อมูลพนักงาน
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            {/* Form Fields */}
            <Grid item xs={12} md={6}>
              <Typography>รหัสพนักงาน</Typography>
              <TextField
                required
                fullWidth
                id="employeeId"
                label="รหัสพนักงาน"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>รหัสผ่าน</Typography>
              <TextField
                required
                fullWidth
                id="password"
                label="รหัสผ่าน"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>ชื่อจริง</Typography>
              <TextField
                required
                fullWidth
                id="firstName"
                label="ชื่อจริง"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>นามสกุล</Typography>
              <TextField
                required
                fullWidth
                id="lastName"
                label="นามสกุล"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>แผนก</Typography>
              <TextField
                required
                fullWidth
                id="department"
                label="แผนก"
                name="department"
                value={formData.department}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>อีเมล</Typography>
              <TextField
                required
                fullWidth
                id="email"
                label="อีเมล"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>เบอร์โทร</Typography>
              <TextField
                required
                fullWidth
                id="phone"
                label="เบอร์โทร"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                size="small"
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
                  onClick={() => console.log("Go back")}
                >
                  กลับ
                </Button>
              </Grid>
              <Grid item marginX={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ fontWeight: "bold" }}
                >
                  บันทึกข้อมูล
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
