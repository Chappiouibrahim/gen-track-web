import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import Interventions from "./pages/Interventions";
import Maintenance from "./pages/Maintenance";
import Alerts from "./pages/Alerts";
import Accounts from "./pages/Accounts";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/interventions" element={<Interventions />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
