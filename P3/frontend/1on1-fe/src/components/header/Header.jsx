import React, {useEffect} from 'react';
import '../../styles/main-header.css';
import { NavLink } from 'react-router-dom';

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
                    <NavLink
                        className={({isActive}) => "nav-link fw-bold py-1 px-0" + (isActive ? " active" : "")}
                        to="/dashboard">Dashboard</NavLink>
                    <NavLink
                        className={({isActive}) => "nav-link fw-bold py-1 px-0" + (isActive ? " active" : "")}
                        to="/suggest">Suggested</NavLink>
                    <NavLink
                        className={({isActive}) => "nav-link fw-bold py-1 px-0" + (isActive ? " active" : "")}
                        to="/event-details">Event Details</NavLink>
                    <NavLink
                        className={({isActive}) => "nav-link fw-bold py-1 px-0" + (isActive ? " active" : "")}
                        to="/contacts">Contacts</NavLink>
                    <a className="nav-link fw-bold py-1 px-0" href="#"
                       data-bs-toggle="modal" data-bs-target="#signOutModal">Sign out</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;
