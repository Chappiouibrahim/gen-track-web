import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const initialInterventions = [
  { id: 1, groupe: "Groupe A", description: "Vérification moteur", date: "2025-09-21", status: "Planifiée" },
  { id: 2, groupe: "Groupe B", description: "Remplacement filtre", date: "2025-09-22", status: "En cours" },
];

function Interventions() {
  const [interventions, setInterventions] = useState(initialInterventions);
  const [open, setOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [newIntervention, setNewIntervention] = useState({ groupe: "", description: "", date: "", status: "Planifiée" });

  // Ouvre/ferme le formulaire
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Ajout ou modification des champs
  const handleChange = (e) => {
    setNewIntervention({ ...newIntervention, [e.target.name]: e.target.value });
  };

  // Ajouter une intervention
  const handleAdd = () => {
    const nextId = interventions.length + 1;
    setInterventions([...interventions, { ...newIntervention, id: nextId }]);
    setNewIntervention({ groupe: "", description: "", date: "", status: "Planifiée" });
    handleClose();
  };

  // Supprimer une intervention
  const handleDelete = (id) => {
    setInterventions(interventions.filter((i) => i.id !== id));
  };

  // Liste filtrée
  const filteredInterventions =
    filterStatus === "Tous" ? interventions : interventions.filter((i) => i.status === filterStatus);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Interventions
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Nouvelle Intervention
        </Button>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <MenuItem value="Tous">Tous</MenuItem>
            <MenuItem value="Planifiée">Planifiée</MenuItem>
            <MenuItem value="En cours">En cours</MenuItem>
            <MenuItem value="Terminée">Terminée</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredInterventions.map((i) => (
          <Grid item xs={12} sm={6} md={4} key={i.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{i.groupe}</Typography>
                <Typography variant="body2">Description : {i.description}</Typography>
                <Typography variant="body2">Date : {i.date}</Typography>
                <Typography variant="body2">Status : {i.status}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => handleDelete(i.id)}
                >
                  Supprimer
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog pour ajouter intervention */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nouvelle Intervention</DialogTitle>
        <DialogContent>
          <TextField
            label="Groupe"
            name="groupe"
            value={newIntervention.groupe}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Description"
            name="description"
            value={newIntervention.description}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Date"
            type="date"
            name="date"
            value={newIntervention.date}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select name="status" value={newIntervention.status} onChange={handleChange}>
              <MenuItem value="Planifiée">Planifiée</MenuItem>
              <MenuItem value="En cours">En cours</MenuItem>
              <MenuItem value="Terminée">Terminée</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Interventions;
