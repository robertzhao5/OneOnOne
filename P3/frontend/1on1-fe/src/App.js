import './App.css';
// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/cover/landing/LandingPage';
import SignupPage from "./components/cover/SignupPage";
import LoginPage from "./components/cover/LoginPage";


function App() {
    const isAuthenticated = false

    useEffect(() => {
        // set dark mode on html
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
