// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { verifyToken } from '../../utils/utils';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await verifyToken();
            console.log(authStatus)
            setIsAuthenticated(authStatus);
        };
        checkAuth().then(r => console.log(r));
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
