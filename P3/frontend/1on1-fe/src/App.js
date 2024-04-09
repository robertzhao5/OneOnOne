import './App.css';
// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


import React from 'react';
import {
    BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import Header from './components/header/Header';
import CoverHeader from './components/cover/CoverHeader';
import LandingPage from './components/cover/landing/LandingPage';
import LoginPage from './components/cover/LoginPage';

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

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path = "/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />} />
          <Route path="/contacts" element={<ListContacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
