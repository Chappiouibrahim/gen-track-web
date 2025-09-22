import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import BuildIcon from "@mui/icons-material/Build";
import EventNoteIcon from "@mui/icons-material/EventNote";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth = 200;

function Sidebar() {
  const location = useLocation(); // pour savoir la page active

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Groupes", icon: <GroupIcon />, path: "/groups" },
    { text: "Interventions", icon: <BuildIcon />, path: "/interventions" },
    { text: "Maintenance", icon: <EventNoteIcon />, path: "/maintenance" },
    { text: "Alertes", icon: <NotificationsIcon />, path: "/alerts" },
    { text: "Comptes", icon: <AccountCircleIcon />, path: "/accounts" },
    { text: "Profil", icon: <PersonIcon />, path: "/profile" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#1976d2",
          color: "white",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" align="center">
          Mon App
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path} // page active surlignée
            sx={{
              "&.Mui-selected": {
                bgcolor: "#1565c0",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
