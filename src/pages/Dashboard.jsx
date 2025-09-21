import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

function Dashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ bgcolor: "#1976d2", color: "white" }}>
          <CardContent>
            <Typography variant="h6">Groupes</Typography>
            <Typography variant="h4">12</Typography>
            <Typography variant="body2">Total installés</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ bgcolor: "#2e7d32", color: "white" }}>
          <CardContent>
            <Typography variant="h6">Interventions</Typography>
            <Typography variant="h4">34</Typography>
            <Typography variant="body2">Cette semaine</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ bgcolor: "#ed6c02", color: "white" }}>
          <CardContent>
            <Typography variant="h6">Pannes</Typography>
            <Typography variant="h4">5</Typography>
            <Typography variant="body2">En cours</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ bgcolor: "#d32f2f", color: "white" }}>
          <CardContent>
            <Typography variant="h6">Alertes</Typography>
            <Typography variant="h4">8</Typography>
            <Typography variant="body2">À vérifier</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
