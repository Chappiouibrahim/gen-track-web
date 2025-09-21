import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Gen Track Web
        </Typography>
        <Button color="inherit" component={Link} to="/">Dashboard</Button>
        <Button color="inherit" component={Link} to="/groups">Groupes</Button>
        <Button color="inherit" component={Link} to="/interventions">Interventions</Button>
        <Button color="inherit" component={Link} to="/maintenance">Maintenance</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
