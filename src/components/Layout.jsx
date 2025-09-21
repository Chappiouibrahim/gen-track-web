import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Navbar toggleSidebar={toggleSidebar} />
      <main style={{ flexGrow: 1, padding: "2rem", marginTop: "64px" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
