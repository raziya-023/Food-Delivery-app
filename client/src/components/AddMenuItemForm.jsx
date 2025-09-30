import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/axios';

// This is the API function that will be called by the mutation
const postMenuItem = ({ restaurantId, data }) => {
    return apiClient.post(`/restaurants/${restaurantId}/menu`, data);
};

function AddMenuItemForm({ restaurantId }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    // Get the QueryClient instance
    const queryClient = useQueryClient();

    // useMutation is the hook for creating/updating/deleting data
    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: postMenuItem,
        // When the mutation is successful, we want to update the UI
        onSuccess: () => {
            // This tells React Query that the data for this restaurant is now stale
            // and needs to be refetched from the server.
            // The key ['restaurant', restaurantId] must match the queryKey in RestaurantDetailPage.jsx
            queryClient.invalidateQueries(['restaurant', restaurantId]);
            
            // Clear the form fields after successful submission
            setName('');
            setDescription('');
            setPrice('');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !price) {
            alert('Name and Price are required.');
            return;
        }
        // Call the mutate function with the required variables
        mutate({ restaurantId, data: { name, description, price: Number(price) } });
    };

    return (
        <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Add a New Menu Item</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 mt-1 text-gray-900 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 mt-1 text-gray-900 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 mt-1 text-gray-900 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                </div>
                {isError && (
                    <p className="text-red-500 text-sm">{error.response?.data?.message || 'An error occurred'}</p>
                )}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-3 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-400"
                >
                    {isLoading ? 'Adding Item...' : 'Add Menu Item'}
                </button>
            </form>
        </div>
    );
}

export default AddMenuItemForm;