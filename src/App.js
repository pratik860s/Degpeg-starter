import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpertSignup from "./Pages/LandingPages/ExpertSignup/ExpertSignup";
import Loginx from "./Pages/LandingPages/Login/Loginx";
import ThankYou from "./Pages/LandingPages/Login/ThankYou"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginx />} />
        <Route path="/register/expert" element={<ExpertSignup />} />
        <Route path="/loggedin" element={<ThankYou />} />

      </Routes>
    </Router>
  );
};

export default App;
