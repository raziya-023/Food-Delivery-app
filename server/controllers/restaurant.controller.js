import { Restaurant } from '../models/Restaurant.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { MenuItem } from '../models/MenuItem.js';

export const createRestaurant = async (req, res) => {
    const { name, cuisine, location } = req.body;

    if (!name || !cuisine || !location) {
        return res.status(400).json({ message: "Name, cuisine, and location are required" });
    }
    
    const mainImageLocalPath = req.file?.path;

    if (!mainImageLocalPath) {
        return res.status(400).json({ message: "Main image for the restaurant is required" });
    }

    try {
        const mainImage = await uploadOnCloudinary(mainImageLocalPath);

        if (!mainImage) {
            return res.status(500).json({ message: "Failed to upload main image" });
        }
        
        const restaurant = await Restaurant.create({
            name,
            cuisine,
            location,
            mainImage: mainImage.secure_url,
            owner: req.user._id,
        });
        
        return res.status(201).json({
            message: "Restaurant created successfully",
            restaurant
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({}).sort({ createdAt: -1 });
        
        return res.status(200).json({
            message: "Restaurants fetched successfully",
            restaurants
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const getRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findById(id).populate('menu').populate('owner', 'username fullName');

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        return res.status(200).json({
            message: "Restaurant details fetched successfully",
            restaurant
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const addMenuItem = async (req, res) => {
    const { name, description, price } = req.body;
    const { restaurantId } = req.params;

    if (!name || !price) {
        return res.status(400).json({ message: "Menu item name and price are required" });
    }

    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        if (restaurant.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Forbidden: You are not the owner of this restaurant" });
        }

        const menuItem = await MenuItem.create({
            name,
            description,
            price,
            restaurant: restaurantId,
        });

        restaurant.menu.push(menuItem._id);
        await restaurant.save();

        return res.status(201).json({
            message: "Menu item added successfully",
            menuItem
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};