import React from "react";
import { Box, Typography, TextField } from "@mui/material";

const TextFieldCustom = ({ title, value, name, type = "text", disabled = false }) => {
  return (
    <Box>
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
      />
    </Box>
  );
};

export default TextFieldCustom;
