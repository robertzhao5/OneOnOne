import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/main-header.css';

function CoverHeader() {
    return (
        <header className="mb-auto">
            <div>
                <h3 className="float-md-start mb-0">1-On-1</h3>
                <nav className="nav nav-masthead justify-content-center float-md-end">
                    <Link className="nav-link fw-bold py-1 px-0 active" to="/">Home</Link>
                    <Link className="nav-link fw-bold py-1 px-0" to="/login">Log in</Link>
                    <Link className="nav-link fw-bold py-1 px-0" to="/signup">Sign up</Link>
                    <Link className="nav-link fw-bold py-1 px-0" to="/about">About</Link>
                </nav>
            </div>
        </header>
    );
}

export default CoverHeader;
