// LandingPage.js
import React from 'react';
import CoverHeader from '../CoverHeader';
import MainContent from './MainContent'; // Assume you have a MainContent component
import Footer from '../CoverFooter'; // Assume you have a Footer component
import 'path/to/cover.css'; // Adjust path as necessary
import 'path/to/landing-header.css'; // Adjust path as necessary

function LandingPage() {
    return (
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <CoverHeader />
            <MainContent />
            <Footer />
        </div>
    );
}

export default LandingPage;
