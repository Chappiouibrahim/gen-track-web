import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("technician"); // default pour test
  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });

  const navigate = useNavigate();

  function showSnack(message, severity = "info") {
    setSnack({ open: true, message, severity });
  }
  function closeSnack() {
    setSnack((s) => ({ ...s, open: false }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // validation simple côté client pour le test
    if (!email.trim() || !password.trim()) {
      showSnack("Email et mot de passe obligatoires", "warning");
      return;
    }

    // LOGIN SIMULÉ : on stocke l'utilisateur localement pour tests
    const user = { email: email.trim(), role };
    localStorage.setItem("user", JSON.stringify(user));
    showSnack("Connexion réussie — redirection...", "success");

    // rediriger vers dashboard après un court délai pour que l'utilisateur voie le snack
    setTimeout(() => {
      navigate("/");
    }, 700);
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" bgcolor="#f5f5f5" p={2}>
      <Paper sx={{ width: 420, p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Connexion
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              autoFocus
            />
            <TextField
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="role-label">Rôle (test)</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                label="Rôle (test)"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="technician">Technicien</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" size="large">
              Login (simulé)
            </Button>

            <Button variant="text" onClick={() => {
              setEmail("admin@example.com");
              setPassword("password");
              setRole("admin");
            }}>
              Remplir exemple admin
            </Button>
          </Stack>
        </form>
      </Paper>

      <Snackbar open={snack.open} autoHideDuration={2500} onClose={closeSnack}>
        <Alert onClose={closeSnack} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
