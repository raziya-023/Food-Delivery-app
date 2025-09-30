import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';

function CreateRestaurantPage() {
    const [formData, setFormData] = useState({
        name: '',
        cuisine: '',
        location: '',
        mainImage: null,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.cuisine || !formData.location || !formData.mainImage) {
            setError('All fields are required.');
            return;
        }
        setError('');
        setLoading(true);

        // We must use FormData because we are sending a file
        const submissionData = new FormData();
        submissionData.append('name', formData.name);
        submissionData.append('cuisine', formData.cuisine);
        submissionData.append('location', formData.location);
        submissionData.append('mainImage', formData.mainImage);

        try {
            const response = await apiClient.post('/restaurants', submissionData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data) {
                // On success, navigate to the new restaurant's detail page
                const newRestaurantId = response.data.restaurant._id;
                navigate(`/restaurant/${newRestaurantId}`);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create restaurant. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-start py-10 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <div className="w-full max-w-2xl p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Add Your Restaurant</h2>
                <p className="text-center text-gray-500 dark:text-gray-400">Become a Feasto partner today!</p>
                {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Restaurant Name</label>
                        <input type="text" name="name" onChange={handleChange} required className="w-full px-3 py-2 mt-1 text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cuisine Type (e.g., Italian, Chinese)</label>
                        <input type="text" name="cuisine" onChange={handleChange} required className="w-full px-3 py-2 mt-1 text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location (e.g., New York, NY)</label>
                        <input type="text" name="location" onChange={handleChange} required className="w-full px-3 py-2 mt-1 text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Main Image</label>
                        <input type="file" name="mainImage" onChange={handleChange} required accept="image/*" className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 dark:file:bg-gray-600 file:text-gray-700 dark:file:text-gray-200 hover:file:bg-gray-300 dark:hover:file:bg-gray-500"/>
                    </div>
                    <button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white bg-teal-600 rounded-md hover:bg-teal-700 disabled:bg-teal-400">
                        {loading ? 'Submitting...' : 'Create Restaurant'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateRestaurantPage;