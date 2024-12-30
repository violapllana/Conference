import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoMatch from "./components/nomatch/noMatch";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Menu from "./components/menu";
import Dashboard from "./components/Dashboard";
import AddParticipant from "./components/addParticipant";
import ContactForm from "./components/ContactForm";


import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-participant" element={<AddParticipant />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactForm />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
