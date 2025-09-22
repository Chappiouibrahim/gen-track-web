import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Interventions() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState(""); // 🔍 barre de recherche
  const [filterStatus, setFilterStatus] = useState("Tous"); // filtre statut

  const [interventions, setInterventions] = useState([
    { id: 1, groupe: "Groupe A", description: "Vidange moteur", date: "2025-09-20", status: "Planifiée" },
    { id: 2, groupe: "Groupe B", description: "Changement filtre", date: "2025-09-21", status: "En cours" },
  ]);

  const [newIntervention, setNewIntervention] = useState({
    id: null,
    groupe: "",
    description: "",
    date: "",
    status: "",
  });

  const handleClickOpen = () => {
    setEditing(false);
    setNewIntervention({ id: null, groupe: "", description: "", date: "", status: "" });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewIntervention({ ...newIntervention, [name]: value });
  };

  const handleAdd = () => {
    if (!newIntervention.groupe || !newIntervention.description || !newIntervention.date || !newIntervention.status) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    if (editing) {
      setInterventions(
        interventions.map((item) =>
          item.id === newIntervention.id ? newIntervention : item
        )
      );
    } else {
      setInterventions([
        ...interventions,
        { id: interventions.length + 1, ...newIntervention },
      ]);
    }

    setNewIntervention({ id: null, groupe: "", description: "", date: "", status: "" });
    setOpen(false);
  };

  const handleDelete = (id) => {
    setInterventions(interventions.filter((row) => row.id !== id));
  };

  const handleEdit = (row) => {
    setEditing(true);
    setNewIntervention(row);
    setOpen(true);
  };

  // Couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case "Terminée":
        return "success";
      case "En cours":
        return "warning";
      case "Planifiée":
        return "info";
      default:
        return "default";
    }
  };

  // 🔍 Filtrer interventions
  const filteredInterventions = interventions.filter((row) => {
    const matchesSearch =
      row.groupe.toLowerCase().includes(search.toLowerCase()) ||
      row.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "Tous" ? true : row.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Barre en-tête */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Gestion des interventions
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {/* Boutons + recherche + filtre */}
        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            Ajouter une intervention
          </Button>

          {/* 🔍 recherche */}
          <TextField
            label="Rechercher"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* filtre statut */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Statut</InputLabel>
            <Select
              value={filterStatus}
              label="Statut"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="Tous">Tous</MenuItem>
              <MenuItem value="Planifiée">Planifiée</MenuItem>
              <MenuItem value="En cours">En cours</MenuItem>
              <MenuItem value="Terminée">Terminée</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Tableau */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Groupe</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInterventions.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.groupe}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={getStatusColor(row.status)}
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredInterventions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Aucune intervention trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Dialog Ajout/Modification */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editing ? "Modifier l'intervention" : "Ajouter une intervention"}
        </DialogTitle>
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
            <InputLabel id="status-select-label">Statut</InputLabel>
            <Select
              labelId="status-select-label"
              name="status"
              value={newIntervention.status}
              onChange={handleChange}
            >
              <MenuItem value="Planifiée">Planifiée</MenuItem>
              <MenuItem value="En cours">En cours</MenuItem>
              <MenuItem value="Terminée">Terminée</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            {editing ? "Mettre à jour" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
