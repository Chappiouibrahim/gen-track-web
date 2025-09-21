import React from "react";
import { Grid, Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { Groups, Build, Warning, Report } from "@mui/icons-material";

function Dashboard() {
  const stats = [
    { title: "Groupes", value: 12, icon: <Groups fontSize="large" />, color: "#1976d2", subtitle: "Total installés" },
    { title: "Interventions", value: 34, icon: <Build fontSize="large" />, color: "#2e7d32", subtitle: "Cette semaine" },
    { title: "Pannes", value: 5, icon: <Warning fontSize="large" />, color: "#ed6c02", subtitle: "En cours" },
    { title: "Alertes", value: 8, icon: <Report fontSize="large" />, color: "#d32f2f", subtitle: "À vérifier" },
  ];

  return (
    <Stack spacing={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ bgcolor: stat.color, color: "white", display: "flex", alignItems: "center", gap: 2, p: 2 }}>
              {stat.icon}
              <Stack>
                <Typography variant="h6">{stat.title}</Typography>
                <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
                <Typography variant="body2">{stat.subtitle}</Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary">Voir toutes les interventions</Button>
        <Button variant="outlined" color="secondary">Planifier une maintenance</Button>
      </Stack>
    </Stack>
  );
}

export default Dashboard;
