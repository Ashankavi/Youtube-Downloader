// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import YouCon from "./Components/YouCon";
import SpotiCon from "./Components/SpotiCon";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/youtube" element={<YouCon />} />
        <Route path="/spotify" element={<SpotiCon />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
