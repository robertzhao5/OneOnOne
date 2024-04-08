import React from 'react';
import '../../styles/main-header.css';

function Header() {
    return (
        <header className="mb-auto">
            <div>
                <h3 className="float-md-start mb-0">1-On-1</h3>
                <nav className="nav nav-masthead justify-content-center float-md-end">
                    <a className="nav-link fw-bold py-1 px-0" href="/dashboard">Dashboard</a>
                    <a className="nav-link fw-bold py-1 px-0" href="/suggest">Suggested</a>
                    <a className="nav-link fw-bold py-1 px-0" href="/event-details" aria-current="page">Event Details</a>
                    <a className="nav-link fw-bold py-1 px-0" href="/contacts">Contacts</a>
                    <a className="nav-link fw-bold py-1 px-0" href="#" data-bs-toggle="modal" data-bs-target="#signOutModal">Sign out</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;