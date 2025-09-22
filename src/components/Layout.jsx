import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Box, Fade } from "@mui/material";

function Layout({ children }) {
  const drawerWidth = 200; // largeur de la sidebar

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar fixe */}
      <Box
        sx={{
          width: drawerWidth,
          flexShrink: 0,
        }}
      >
        <Sidebar />
      </Box>

      {/* Contenu principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`, // décale le contenu à droite de la sidebar
          minHeight: "100vh",
          bgcolor: "#f5f5f5", // fond clair
          transition: "all 0.3s ease-in-out", // petite animation
        }}
      >
        {/* Navbar en haut */}
        <Navbar />

        {/* Contenu des pages avec animation fade */}
        <Fade in={true} timeout={500}>
          <Box sx={{ p: 3 }}>{children}</Box>
        </Fade>
      </Box>
    </Box>
  );
}

export default Layout;
