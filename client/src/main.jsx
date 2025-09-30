import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import './index.css';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import RestaurantDetailPage from './pages/RestaurantDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CreateRestaurantPage from './pages/CreateRestaurantPage.jsx';
import AuthLayout from './components/AuthLayout.jsx';
import RootLayout from './RootLayout.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <HomePage />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'signup',
                element: <SignupPage />,
            },
            {
                path: 'restaurant/:id',
                element: <RestaurantDetailPage />,
            },
            {
                path: 'cart',
                element: <CartPage />,
            },
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: 'create-restaurant',
                        element: <CreateRestaurantPage />,
                    }
                ]
            }
        ],
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster />
        </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);