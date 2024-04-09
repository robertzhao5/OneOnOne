import React, { useEffect, useState } from 'react';
import '../../styles/main-header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function Header() {

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            // Signout logic
            localStorage.removeItem('accessToken'); // Clear access token
            localStorage.removeItem('refreshToken'); // Clear refresh token
            navigate('/landing'); // Redirect to landing page after sign out
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

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
                        to="/availabilities">Availabilities</NavLink>
                    <NavLink
                        className={({isActive}) => "nav-link fw-bold py-1 px-0" + (isActive ? " active" : "")}
                        to="/event-details">Event Details</NavLink>
                    <NavLink
                        className={({isActive}) => "nav-link fw-bold py-1 px-0" + (isActive ? " active" : "")}
                        to="/contacts">Contacts</NavLink>
                    <NavLink
                        className={({isActive}) => "nav-link fw-bold py-1 px-0" + (isActive ? " active" : "")}
                        to="#"
                        onClick={() => setShowModal(true)}>Sign out</NavLink>
                </nav>
            </div>
            {showModal && ( // Show signout confirmation model
            <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
                <ModalHeader toggle={() => setShowModal(false)}>Confirm Sign Out</ModalHeader>
                <ModalBody>
                    Are you sure you want to sign out?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button color="primary" onClick={handleSignOut}>Sign Out</Button>
                </ModalFooter>
            </Modal>
            )}
        </header>
    );
}

export default Header;
