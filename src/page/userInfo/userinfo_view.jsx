import React from 'react';
import { Button } from '@mui/material';

function UserInfo_View() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Hello, UserInfo</h1>
      <Button variant="contained" color="primary" className="w-40 py-2 text-white">
        MUI Button
      </Button>
    </div>
  );
}

export default UserInfo_View;
