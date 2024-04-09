import React, {useEffect, useState} from 'react';
import LoginForm from "./forms/LoginForm";
import CoverHeader from "./CoverHeader";
import Footer from "./CoverFooter";
import '../../styles/login.css'
import {verifyToken} from "../../utils/utils";
import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthContext";


function LoginPage() {
    const isAuthenticated = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && window.location.pathname !== "/dashboard") {
            // navigate("/dashboard");
        }
    }, [isAuthenticated]);


    return (
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <CoverHeader/>
            <main className="form-login form-signup w-100 m-auto">
                <LoginForm/>
            </main>
            <Footer/>
        </div>
    );
}

export default LoginPage;
