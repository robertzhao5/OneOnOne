import React, {useEffect} from 'react';
import RegistrationForm from "./forms/RegistrationForm";
import CoverHeader from "./CoverHeader";
import Footer from "./CoverFooter";
import '../../styles/login.css'


function SignupPage() {
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
            <main className="form-login form-signup w-100 m-auto">
                <RegistrationForm/>
            </main>
            <Footer/>
        </div>
    );
}

export default SignupPage;
