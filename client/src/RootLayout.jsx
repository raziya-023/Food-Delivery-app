import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { login, logout } from './store/authSlice';
import apiClient from './api/axios';

function RootLayout() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiClient.get('/auth/currentUser')
            .then(response => {
                if (response.data && response.data.user) {
                    dispatch(login(response.data.user));
                }
            })
            .catch(() => {
                dispatch(logout());
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <p className="text-white text-xl">Loading Feasto...</p>
            </div>
        );
    }

    return <Outlet />;
}

export default RootLayout;