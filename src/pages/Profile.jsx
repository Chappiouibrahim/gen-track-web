import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      setUser(null);
    }
  }, []);

  return (
    <Box p={3}>
      <Paper sx={{ p: 4, maxWidth: 600, margin: "0 auto", bgcolor: "#fafafa" }}>
        <Typography variant="h5" gutterBottom>
          Profil
        </Typography>

        {user ? (
          <>
            <Typography><strong>Email :</strong> {user.email}</Typography>
            <Typography><strong>Rôle :</strong> {user.role}</Typography>
          </>
        ) : (
          <Typography color="textSecondary">Aucun utilisateur connecté (testez la page Login)</Typography>
        )}
      </Paper>
    </Box>
  );
}
