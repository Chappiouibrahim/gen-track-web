// src/pages/Groups.jsx
import React, { useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  Chip,
  Drawer,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialGroups = [
  {
    id: 1,
    name: "Groupe A",
    status: "OK",
    power: "50 kVA",
    location: "Site Nord",
    lastMaintenance: "2025-09-01",
    notes: "Fonctionne bien",
  },
  {
    id: 2,
    name: "Groupe B",
    status: "En maintenance",
    power: "100 kVA",
    location: "Site Sud",
    lastMaintenance: "2025-08-10",
    notes: "Remplacement filtre programmé",
  },
  {
    id: 3,
    name: "Groupe C",
    status: "En panne",
    power: "75 kVA",
    location: "Site Est",
    lastMaintenance: "2025-07-02",
    notes: "Panne moteur critique",
  },
];

function statusColor(status) {
  if (!status) return "default";
  if (status.toLowerCase().includes("ok")) return "success";
  if (status.toLowerCase().includes("panne") || status.toLowerCase().includes("en panne")) return "error";
  if (status.toLowerCase().includes("maintenance") || status.toLowerCase().includes("en maintenance")) return "warning";
  return "default";
}

export default function Groups() {
  const [groups, setGroups] = useState(initialGroups);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [qrInput, setQrInput] = useState("");
  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });

  function openDetails(group) {
    setSelected(group);
    setDrawerOpen(true);
  }

  function closeDetails() {
    setDrawerOpen(false);
    setSelected(null);
  }

  function toggleStatus(id) {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        // cycle OK -> En maintenance -> En panne -> OK
        const s = g.status;
        let next = "OK";
        if (s === "OK") next = "En maintenance";
        else if (s === "En maintenance") next = "En panne";
        else if (s === "En panne") next = "OK";
        return { ...g, status: next };
      })
    );
    setSnack({ open: true, message: "Statut mis à jour", severity: "success" });
  }

  function removeGroup(id) {
    if (!confirm("Supprimer ce groupe ?")) return;
    setGroups((prev) => prev.filter((g) => g.id !== id));
    setSnack({ open: true, message: "Groupe supprimé", severity: "info" });
    if (selected && selected.id === id) closeDetails();
  }

  function openQrDialog() {
    setQrInput("");
    setQrDialogOpen(true);
  }

  function handleQrScan() {
    // recherche par id ou nom
    const q = qrInput.trim();
    if (!q) {
      setSnack({ open: true, message: "Entrez l'ID ou le nom du groupe à simuler", severity: "warning" });
      return;
    }
    let found = null;
    if (/^\d+$/.test(q)) {
      found = groups.find((g) => String(g.id) === q);
    }
    if (!found) {
      found = groups.find((g) => g.name.toLowerCase() === q.toLowerCase());
    }
    if (found) {
      setQrDialogOpen(false);
      setTimeout(() => {
        openDetails(found);
        setSnack({ open: true, message: `Scan simulé : ${found.name}`, severity: "success" });
      }, 200);
    } else {
      setSnack({ open: true, message: "Groupe non trouvé", severity: "error" });
    }
  }

  function closeSnack() {
    setSnack({ ...snack, open: false });
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">Liste des groupes électrogènes</Typography>
        <Stack direction="row" spacing={1}>
          <Button startIcon={<QrCodeScannerIcon />} variant="outlined" onClick={openQrDialog}>
            Simuler scan QR
          </Button>
          <Button variant="contained" color="primary" startIcon={<EditIcon />}>
            Ajouter un groupe
          </Button>
        </Stack>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Puissance</TableCell>
              <TableCell>Localisation</TableCell>
              <TableCell>Dernière maintenance</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {groups.map((g) => (
              <TableRow key={g.id} hover>
                <TableCell>{g.id}</TableCell>
                <TableCell>{g.name}</TableCell>
                <TableCell>
                  <Chip label={g.status} color={statusColor(g.status)} />
                </TableCell>
                <TableCell>{g.power}</TableCell>
                <TableCell>{g.location}</TableCell>
                <TableCell>{g.lastMaintenance}</TableCell>
                <TableCell align="right">
                  <IconButton title="Voir" onClick={() => openDetails(g)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton title="Simuler QR" onClick={() => { setQrInput(String(g.id)); handleQrScan(); }}>
                    <QrCodeScannerIcon />
                  </IconButton>
                  <IconButton title="Changer statut" onClick={() => toggleStatus(g.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton title="Supprimer" onClick={() => removeGroup(g.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {groups.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Aucun groupe
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Drawer Détails */}
      <Drawer anchor="right" open={drawerOpen} onClose={closeDetails}>
        <Box sx={{ width: 360, p: 3 }}>
          {selected ? (
            <>
              <Typography variant="h6" gutterBottom>{selected.name}</Typography>
              <Typography><strong>Statut :</strong> <Chip label={selected.status} color={statusColor(selected.status)} sx={{ ml: 1 }} /></Typography>
              <Typography><strong>Puissance :</strong> {selected.power}</Typography>
              <Typography><strong>Localisation :</strong> {selected.location}</Typography>
              <Typography><strong>Dernière maintenance :</strong> {selected.lastMaintenance}</Typography>
              <Typography sx={{ mt: 2 }}><strong>Notes :</strong></Typography>
              <Typography variant="body2">{selected.notes}</Typography>

              <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                <Button variant="contained" onClick={() => toggleStatus(selected.id)}>Changer statut</Button>
                <Button variant="outlined" color="error" onClick={() => removeGroup(selected.id)}>Supprimer</Button>
                <Button onClick={closeDetails}>Fermer</Button>
              </Stack>
            </>
          ) : (
            <Typography>Pas de groupe sélectionné</Typography>
          )}
        </Box>
      </Drawer>

      {/* Dialog Scan QR */}
      <Dialog open={qrDialogOpen} onClose={() => setQrDialogOpen(false)}>
        <DialogTitle>Simuler un scan QR</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Entrez l'ID du groupe (ex: 1) ou le nom (ex: Groupe A), puis cliquez sur "Scanner".
          </Typography>
          <TextField
            fullWidth
            value={qrInput}
            onChange={(e) => setQrInput(e.target.value)}
            placeholder="ID ou nom du groupe"
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQrDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleQrScan} variant="contained">Scanner</Button>
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
