import React from 'react';
import { Link } from 'react-router-dom';

function RestaurantCard({ restaurant }) {
    return (
        <Link to={`/restaurant/${restaurant._id}`} className="block group">
            <div className="overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 transform transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-48">
                    <img
                        src={restaurant.mainImage}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {restaurant.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {restaurant.cuisine}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default RestaurantCard;