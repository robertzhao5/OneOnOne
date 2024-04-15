import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/main-header.css';

function CoverHeader() {
    return (
        <header className="mb-auto">
            <div>
                <h3 className="float-md-start mb-0">1-On-1</h3>
                <nav className="nav nav-masthead justify-content-center float-md-end">
                    <NavLink
                        className={({ isActive }) => "nav-link fw-bold py-1 px-0" + (isActive ? " active" : "")}
                        to="/landing">Home</NavLink>
                    <NavLink
                        className={({ isActive }) => "nav-link fw-bold py-1 px-0" + (isActive ? " active" : "")}
                        to="/login">Log in</NavLink>
                    <NavLink
                        className={({ isActive }) => "nav-link fw-bold py-1 px-0" + (isActive ? " active" : "")}
                        to="/signup">Sign up</NavLink>
                    <NavLink
                        className={({ isActive }) => "nav-link fw-bold py-1 px-0" + (isActive ? " active" : "")}
                        to="/about">About</NavLink>
                </nav>
            </div>
        </header>
    );
}

export default CoverHeader;
