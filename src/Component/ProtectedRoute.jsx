import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from './store/authStore';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuthStore();
    // const location = useLocation();

    const isAuthenticated = isLoggedIn ; 

    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
