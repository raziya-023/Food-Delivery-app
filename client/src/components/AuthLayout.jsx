import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AuthLayout() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        // If the user is not authenticated, redirect to the login page
        return <Navigate to="/login" replace />;
    }

    return <Outlet />; // Otherwise, render the child route (e.g., CreateRestaurantPage)
}

export default AuthLayout;