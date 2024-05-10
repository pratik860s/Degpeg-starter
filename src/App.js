import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpertSignup from "./Pages/LandingPages/ExpertSignup/ExpertSignup";
import Loginx from "./Pages/LandingPages/Login/Loginx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginx />} />
        <Route path="/register/expert" element={<ExpertSignup />} />
      </Routes>
    </Router>
  );
};

export default App;
