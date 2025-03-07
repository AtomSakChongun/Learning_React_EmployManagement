import React from "react";
import { Box, Typography, TextField } from "@mui/material";

const TextFieldCustom = ({ title, value, name, type = "text", disabled = false, onClick, onChange }) => {
  return (
    <Box mb={2}>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <TextField
        required
        fullWidth
        id={name}
        label={title}
        name={name}
        value={value}
        size="small"
        disabled={disabled}
        type={type}
        variant="outlined"
        onClick={onClick}
        onChange={onChange}
      />
    </Box>
  );
};  

export default TextFieldCustom;
