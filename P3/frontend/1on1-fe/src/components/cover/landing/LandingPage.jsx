// LandingPage.js
import React, { useEffect } from 'react';
import CoverHeader from '../CoverHeader';
import MainContent from './MainContent';
import Footer from '../CoverFooter';
import '../../../styles/cover.css';

function LandingPage() {
    useEffect(() => {
        // add bootstrap classes to body on mount
        document.body.classList.add("d-flex", "h-100", "text-center", "text-bg-dark");
        // remove bt classes on unmount
        return () => {
            document.body.classList.remove("d-flex", "h-100", "text-center", "text-bg-dark");
        }
    }, []); // empty dep so effect runs only once on mount

    return (
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <CoverHeader/>
            <MainContent/>
            <Footer/>
        </div>
    );
}

export default LandingPage;
