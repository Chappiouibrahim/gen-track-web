// src/pages/Maintenance.jsx
import React, { useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";

const initialMaintenances = [
  { id: 1, group: "Groupe 1", date: "2025-09-25", type: "Préventive", status: "Planifiée" },
  { id: 2, group: "Groupe 3", date: "2025-09-28", type: "Corrective", status: "En cours" },
  { id: 3, group: "Groupe 4", date: "2025-10-02", type: "Préventive", status: "Terminée" },
];

function statusColor(status) {
  if (!status) return "default";
  if (status.toLowerCase().includes("planifiée")) return "info";
  if (status.toLowerCase().includes("cours")) return "warning";
  if (status.toLowerCase().includes("terminée")) return "success";
  return "default";
}

export default function Maintenance() {
  const [maintenances, setMaintenances] = useState(initialMaintenances);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ group: "", type: "", date: "", status: "Planifiée" });
  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });

  function openDialog() {
    setForm({ group: "", type: "", date: "", status: "Planifiée" });
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function addMaintenance() {
    if (!form.group || !form.type || !form.date) {
      setSnack({ open: true, message: "Tous les champs sont obligatoires", severity: "warning" });
      return;
    }
    const newItem = { id: Date.now(), ...form };
    setMaintenances((prev) => [newItem, ...prev]);
    setSnack({ open: true, message: "Maintenance ajoutée", severity: "success" });
    setDialogOpen(false);
  }

  function removeMaintenance(id) {
    if (!confirm("Supprimer cette maintenance ?")) return;
    setMaintenances((prev) => prev.filter((m) => m.id !== id));
    setSnack({ open: true, message: "Maintenance supprimée", severity: "info" });
  }

  function closeSnack() {
    setSnack({ ...snack, open: false });
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">Maintenance</Typography>
        <Button variant="contained" onClick={openDialog}>
          Nouvelle maintenance
        </Button>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Groupe</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maintenances.map((m) => (
              <TableRow key={m.id} hover>
                <TableCell>{m.group}</TableCell>
                <TableCell>{m.type}</TableCell>
                <TableCell>{m.date}</TableCell>
                <TableCell>
                  <Chip label={m.status} color={statusColor(m.status)} />
                </TableCell>
                <TableCell align="right">
                  <Button color="error" onClick={() => removeMaintenance(m.id)}>
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {maintenances.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Aucune maintenance
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Ajout */}
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Nouvelle maintenance</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Groupe" name="group" value={form.group} onChange={handleFormChange} fullWidth />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select name="type" value={form.type} onChange={handleFormChange}>
                <MenuItem value="Préventive">Préventive</MenuItem>
                <MenuItem value="Corrective">Corrective</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="date"
              label="Date"
              name="date"
              value={form.date}
              onChange={handleFormChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Statut</InputLabel>
              <Select name="status" value={form.status} onChange={handleFormChange}>
                <MenuItem value="Planifiée">Planifiée</MenuItem>
                <MenuItem value="En cours">En cours</MenuItem>
                <MenuItem value="Terminée">Terminée</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Annuler</Button>
          <Button onClick={addMaintenance} variant="contained">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={closeSnack}>
        <Alert onClose={closeSnack} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
