// LandingPage.js
import React from 'react';
import CoverHeader from '../CoverHeader';
import MainContent from './MainContent';
import Footer from '../CoverFooter';
import '../../../styles/cover.css';

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
