import React from 'react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/axios';
import RestaurantCard from '../components/RestaurantCard';

// This function tells React Query how to fetch our restaurants
const fetchRestaurants = async () => {
    const { data } = await apiClient.get('/restaurants');
    return data.restaurants;
};

function HomePage() {
    // useQuery handles all the fetching, caching, loading, and error states for us
    const { data: restaurants, isLoading, isError, error } = useQuery({
        queryKey: ['restaurants'], // A unique name for this data
        queryFn: fetchRestaurants,
    });

    if (isLoading) {
        return <div className="text-center p-8  text-gray-500">Loading restaurants...</div>;
    }

    if (isError) {
        return <div className="text-center p-8 text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Featured Restaurants</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                ))}
            </div>
            {restaurants.length === 0 && (
                <p className="text-center text-gray-500">No restaurants found yet. Be the first to add one!</p>
            )}
        </div>
    );
}

export default HomePage;