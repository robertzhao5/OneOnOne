import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/main-header.css';

function Header() {
    return (
        <header className="mb-auto">
            <div>
                <h3 className="float-md-start mb-0">1-On-1</h3>
                <nav className="nav nav-masthead justify-content-center float-md-end">
                    <Link className="nav-link fw-bold py-1 px-0" to="/dashboard">Dashboard</Link>
                    <Link className="nav-link fw-bold py-1 px-0" to="/suggest">Suggested</Link>
                    <Link className="nav-link fw-bold py-1 px-0" to="/event-details">Event Details</Link>
                    <Link className="nav-link fw-bold py-1 px-0" to="/contacts">Contacts</Link>
                    {/* we should consider handling the sign-out click event to perform sign out logic */}
                    <button className="nav-link fw-bold py-1 px-0 btn btn-link" data-bs-toggle="modal" data-bs-target="#signOutModal">Sign out</button>
                </nav>
            </div>
        </header>
    );
}

export default Header;
