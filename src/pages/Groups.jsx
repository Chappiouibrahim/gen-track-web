import React from "react";
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";

const groupsData = [
  { id: 1, name: "Groupe A", status: "OK" },
  { id: 2, name: "Groupe B", status: "Problème" },
  { id: 3, name: "Groupe C", status: "Maintenance" },
  { id: 4, name: "Groupe D", status: "OK" },
];

function Groups() {
  const getStatusColor = (status) => {
    switch (status) {
      case "OK":
        return "#2e7d32"; // vert
      case "Problème":
        return "#d32f2f"; // rouge
      case "Maintenance":
        return "#ed6c02"; // orange
      default:
        return "#1976d2"; // bleu par défaut
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Groupes
      </Typography>
      <Grid container spacing={3}>
        {groupsData.map((group) => (
          <Grid item xs={12} sm={6} md={3} key={group.id}>
            <Card sx={{ bgcolor: getStatusColor(group.status), color: "white" }}>
              <CardContent>
                <Typography variant="h6">{group.name}</Typography>
                <Typography variant="body1">Status: {group.status}</Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2, bgcolor: "white", color: getStatusColor(group.status) }}
                >
                  Détails
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Groups;
