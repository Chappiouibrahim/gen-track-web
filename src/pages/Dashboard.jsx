import React from "react";
import { Grid, Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { Groups, Build, WarningAmber, Report } from "@mui/icons-material";

export default function Dashboard() {
  const stats = [
    { title: "Groupes", value: 12, icon: <Groups fontSize="large" />, color: "#1976d2", subtitle: "Total installés" },
    { title: "Interventions", value: 34, icon: <Build fontSize="large" />, color: "#2e7d32", subtitle: "Cette semaine" },
    { title: "Pannes", value: 5, icon: <WarningAmber fontSize="large" />, color: "#ed6c02", subtitle: "En cours" },
    { title: "Alertes", value: 8, icon: <Report fontSize="large" />, color: "#d32f2f", subtitle: "À vérifier" },
  ];

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Dashboard</Typography>

      <Grid container spacing={3}>
        {stats.map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ bgcolor: s.color, color: "white", display: "flex", alignItems: "center", gap: 2, p: 2 }}>
              {s.icon}
              <div>
                <Typography variant="h6">{s.title}</Typography>
                <Typography variant="h4" fontWeight="bold">{s.value}</Typography>
                <Typography variant="body2">{s.subtitle}</Typography>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" spacing={2}>
        <Button variant="contained">Voir interventions</Button>
        <Button variant="outlined">Planifier maintenance</Button>
      </Stack>
    </Stack>
  );
}
