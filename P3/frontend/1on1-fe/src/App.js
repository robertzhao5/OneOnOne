import './App.css';

import React from 'react';
import {
    BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import Header from './components/header/Header';
import CoverHeader from './components/cover/CoverHeader';
import LandingPage from './components/cover/LandingPage';
import LoginPage from './components/cover/LoginPage';


function App() {
    const isAuthenticated = false

    return (
        <Router>
            {isAuthenticated ? <Header/> : <CoverHeader/>}
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
