import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Box, Toolbar } from "@mui/material";

function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* pour laisser un espace sous la Navbar */}
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
