import './App.css';
// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LandingPage from './components/cover/landing/LandingPage';
import SignupPage from "./components/cover/SignupPage";
import LoginPage from "./components/cover/LoginPage";
import AboutPage from "./components/cover/AboutPage";
import Suggestion from "./components/calendar/suggest";
import Availabilities from "./components/availabilities/Availabilities";
import ListContacts from './components/contacts/ListContact';
import Dashboard from "./components/dashboard/Dashboard";
import EventDetails from './components/EventDetails/EventDetails';
import {AuthProvider} from './components/auth/AuthContext';

import {verifyToken, ProtectedRoute} from "./utils/utils";
import Calendars from "./components/calendar/Calendars";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    let authenticated = false;


    useEffect(() => {
        // Add Bootstrap styling to the body element
        document.body.classList.add("d-flex", "h-100", "text-center", "text-bg-dark");

        const checkAuth = async () => {
            const authStatus = await verifyToken();
            console.log("checked")
            setIsAuthenticated(authStatus);
            authenticated = authStatus
        }
        checkAuth().then(r => console.log(r));

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
        <AuthProvider>
        <Router>
            <Routes>
                <Route path="/"
                       element={isAuthenticated ? <Navigate to="/dashboard"/> :
                           <Navigate to="/landing"/>}/>
                <Route path="/dashboard" element={<ProtectedRoute
                    isAuthenticated={isAuthenticated}><Dashboard/></ProtectedRoute>}/>
                <Route path="/calendars" element={<Calendars/>}/>
                <Route path="/landing" element={<LandingPage/>}/>
                <Route path="/contacts" element={<ListContacts/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/event-details" element={<EventDetails/>}/>
                <Route path="/suggest" element={<Suggestion/>}/>
                <Route path="/availabilities" element={<ProtectedRoute
                    isAuthenticated={isAuthenticated}><Availabilities/></ProtectedRoute>}/>
            </Routes>
        </Router>
        </AuthProvider>

    );
}

export default App;
