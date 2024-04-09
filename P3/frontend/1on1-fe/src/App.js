import './App.css';
// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './components/cover/landing/LandingPage';
import SignupPage from "./components/cover/SignupPage";
import LoginPage from "./components/cover/LoginPage";
import AboutPage from "./components/cover/AboutPage";

import ListContacts from './components/contacts/ListContact';
import Layout from './Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  useEffect(() => {
    // Add Bootstrap styling to the body element
    document.body.classList.add("d-flex", "h-100", "text-center", "text-bg-dark");
    // Remove the added Bootstrap styling when the component unmounts
    return () => {
        document.body.classList.remove("d-flex", "h-100", "text-center", "text-bg-dark");
    };
  }, []);

  useEffect(() => {
      // set dark mode on html
      document.documentElement.setAttribute('data-bs-theme', 'dark');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/Dashbord" /> : <Navigate to="/landing" />} />
          <Route path="/contacts" element={<ListContacts />} />
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
