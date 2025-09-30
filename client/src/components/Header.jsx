import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import apiClient from '../api/axios';
import toast from 'react-hot-toast';

function Header() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await apiClient.post('/auth/logout');
            dispatch(logout());
            toast.success('Logged out successfully!');
        } catch (error) {
            console.error("Logout failed:", error);
            dispatch(logout());
        }
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
            {/* Desktop and Tablet Menu */}
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <HomeIcon className="text-teal-600 dark:text-teal-400" />
                    <span className="text-xl font-bold text-teal-600 dark:text-teal-400">
                        Feasto
                    </span>
                </Link>

                {/* Desktop and Tablet Links */}
                <div className="hidden md:flex items-center space-x-4">
                    <NavLink to="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-teal-500 transition-colors">
                        <ShoppingCartIcon />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        )}
                    </NavLink>

                    {isAuthenticated ? (
                        <>
                            <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name}!</span>
                            <Link to="/create-restaurant" className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg shadow-md hover:bg-teal-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                                Add Restaurant
                            </Link>
                            <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg shadow-md hover:bg-teal-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-500">Login</Link>
                            <Link to="/signup" className="px-4 py-2 text-sm text-white bg-teal-600 rounded-lg shadow-md hover:bg-teal-700 transition-colors">Sign Up</Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <NavLink to="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-teal-500 transition-colors mr-4">
                        <ShoppingCartIcon />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        )}
                    </NavLink>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 dark:text-gray-300">
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800 px-6 pb-4 flex flex-col items-center space-y-4">
                    {isAuthenticated ? (
                        <>
                            <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name}!</span>
                             <Link to="/create-restaurant" onClick={() => setIsMenuOpen(false)} className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg shadow-md hover:bg-teal-700 transition-colors">
                                Add Restaurant
                            </Link>
                            <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full px-4 py-2 text-sm font-semibold text-white  bg-teal-600 rounded-lg shadow-md hover:bg-teal-700 transition-colors">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">Login</Link>
                            <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="w-full text-center px-4 py-2 text-sm text-white bg-teal-600 rounded-lg shadow-md hover:bg-teal-700">Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;