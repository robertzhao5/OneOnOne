import axios from 'axios';
import {Navigate} from "react-router-dom";

export const verifyToken = async () => {
    const token = localStorage.getItem('accessToken'); // Assuming the token is stored in localStorage
    if (!token) {
        return false; // no token found
    }
    try {
        await axios.post('api/token/verify/', {
            token: token
        });
        return true; // valid token
    } catch (error) {
        console.error("Token verification failed:", error);
        return false; // invalid token
    }
};

export const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated && window.location.pathname !== '/login') {
        // Redirect to the login page or landing page if not authenticated
        console.log('navigated back');
        return <Navigate to="/login" />;
    }
    return children;
};


