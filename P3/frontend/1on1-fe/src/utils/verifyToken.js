import axios from 'axios';

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


