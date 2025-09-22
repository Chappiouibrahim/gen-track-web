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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const initialMaintenances = [
  { id: 1, groupe: "Groupe A", type: "Préventive", date: "2025-09-25", status: "Planifiée" },
  { id: 2, groupe: "Groupe B", type: "Corrective", date: "2025-09-26", status: "En cours" },
];

function Maintenance() {
  const [maintenances, setMaintenances] = useState(initialMaintenances);
  const [open, setOpen] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState({ groupe: "", type: "Préventive", date: "", status: "Planifiée" });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewMaintenance({ ...newMaintenance, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const nextId = maintenances.length + 1;
    setMaintenances([...maintenances, { ...newMaintenance, id: nextId }]);
    setNewMaintenance({ groupe: "", type: "Préventive", date: "", status: "Planifiée" });
    handleClose();
  };

  const handleDelete = (id) => {
    setMaintenances(maintenances.filter((m) => m.id !== id));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Maintenance
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleOpen}>
        Planifier Maintenance
      </Button>

      <Grid container spacing={3}>
        {maintenances.map((m) => (
          <Grid item xs={12} sm={6} md={4} key={m.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{m.groupe}</Typography>
                <Typography variant="body2">Type : {m.type}</Typography>
                <Typography variant="body2">Date : {m.date}</Typography>
                <Typography variant="body2">Status : {m.status}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => handleDelete(m.id)}
                >
                  Supprimer
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog pour ajouter maintenance */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nouvelle Maintenance</DialogTitle>
        <DialogContent>
          <TextField
            label="Groupe"
            name="groupe"
            value={newMaintenance.groupe}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />

          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select name="type" value={newMaintenance.type} onChange={handleChange}>
              <MenuItem value="Préventive">Préventive</MenuItem>
              <MenuItem value="Corrective">Corrective</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Date"
            type="date"
            name="date"
            value={newMaintenance.date}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />

          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select name="status" value={newMaintenance.status} onChange={handleChange}>
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

export default Maintenance;
