import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/cartSlice';
import AddMenuItemForm from '../components/AddMenuItemForm';
import toast from 'react-hot-toast';

// API function to fetch a single restaurant by its ID
const fetchRestaurantById = async (id) => {
    const { data } = await apiClient.get(`/restaurants/${id}`);
    return data.restaurant;
};

function RestaurantDetailPage() {
    // useParams() is a hook from React Router that gives us the dynamic part of the URL
    const { id } = useParams();
    const dispatch = useDispatch();

    const { user: currentUser, isAuthenticated } = useSelector((state) => state.auth);

    const { data: restaurant, isLoading, isError, error } = useQuery({
        queryKey: ['restaurant', id],
        queryFn: () => fetchRestaurantById(id),
        enabled: !!id,
    });

    const handleAddToCart = (menuItem) => {
        dispatch(addItem(menuItem));
        toast.success(`${menuItem.name} added to cart!`);
    };

    if (isLoading) {
        return <div className="text-center p-8">Loading restaurant details...</div>;
    }

    if (isError) {
        return <div className="text-center p-8 text-red-500">Error: {error.message}</div>;
    }

    // Use optional chaining (?.) to prevent errors if restaurant or owner is not yet loaded
    const isOwner = isAuthenticated && currentUser?._id === restaurant?.owner?._id;

    return (
        <div className="bg-white dark:bg-gray-900">
            {/* Restaurant Hero Section */}
            <div className="h-64 md:h-80 relative">
                <img src={restaurant.mainImage} alt={restaurant.name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white">{restaurant.name}</h1>
                        <p className="text-lg text-gray-200 mt-2">{restaurant.cuisine}</p>
                        <p className="text-md text-gray-300">{restaurant.location}</p>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Menu</h2>
                <div className="space-y-6">
                    {restaurant.menu.map((item) => (
                        <div key={item._id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex justify-between items-center shadow-md">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                                <p className="text-lg font-semibold text-teal-600 dark:text-teal-400 mt-2">${item.price.toFixed(2)}</p>
                            </div>
                            <button 
                            onClick={() => handleAddToCart(item)}
                            className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700"
                        >
                            Add to Cart
                        </button>
                        </div>
                    ))}

                    {restaurant.menu.length === 0 && (
                        <p className="text-center text-gray-500">This restaurant hasn't added any menu items yet.</p>
                    )}
                </div>
                {isOwner && <AddMenuItemForm restaurantId={id} />}
            </div>
        </div>
    );
}

export default RestaurantDetailPage;