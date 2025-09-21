import React from "react";
import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

function Interventions() {
  const interventions = [
    { id: 1, group: "Groupe A", action: "Changement d’huile", date: "21/09/2025" },
    { id: 2, group: "Groupe C", action: "Remplacement filtre", date: "20/09/2025" },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Historique des interventions
      </Typography>
      <List>
        {interventions.map((i) => (
          <ListItem key={i.id}>
            <ListItemText
              primary={`${i.group} - ${i.action}`}
              secondary={`Date : ${i.date}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Interventions;
