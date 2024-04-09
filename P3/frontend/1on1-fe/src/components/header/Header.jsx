import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // Assuming you will use this in the future
import '../../styles/main-header.css';

function Header() {
    useEffect(() => {
        // Add Bootstrap styling to the body element
        document.body.classList.add("d-flex", "h-100", "text-center", "text-bg-dark");
        // Remove the added Bootstrap styling when the component unmounts
        return () => {
            document.body.classList.remove("d-flex", "h-100", "text-center", "text-bg-dark");
        };
    }, []);

    return (
        <header className="mb-auto">
            <div>
                <h3 className="float-md-start mb-0">1-On-1</h3>
                <nav className="nav nav-masthead justify-content-center float-md-end">
                    <NavLink className="nav-link fw-bold py-1 px-0" href="/dashboard">Dashboard</NavLink>
                    <NavLink className="nav-link fw-bold py-1 px-0" href="/suggest">Suggested</NavLink>
                    <NavLink className="nav-link fw-bold py-1 px-0" href="/event-details" aria-current="page">Event Details</NavLink>
                    <NavLink className="nav-link fw-bold py-1 px-0" to="/contacts">Contacts</NavLink>
                    <a className="nav-link fw-bold py-1 px-0" href="#" data-bs-toggle="modal" data-bs-target="#signOutModal">Sign out</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;