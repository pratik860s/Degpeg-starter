import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import ExpertSignup from "./Pages/ExpertSignup/ExpertSignup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register/expert" element={<ExpertSignup />} />
      </Routes>
    </Router>
  );
};

export default App;
