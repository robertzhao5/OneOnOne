import './App.css';
// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LandingPage from './components/cover/landing/LandingPage';
import SignupPage from "./components/cover/SignupPage";
import LoginPage from "./components/cover/LoginPage";
import AboutPage from "./components/cover/AboutPage";

import ListContacts from './components/contacts/ListContact';

function App() {
    let isAuthenticated = false

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
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/Dashboard"/> :
                    <Navigate to="/landing"/>}/>
                <Route path="/landing" element={<LandingPage/>}/>
                <Route path="/contacts" element={<ListContacts/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
