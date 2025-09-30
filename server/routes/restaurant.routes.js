import { Router } from 'express';
import {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    addMenuItem
} from '../controllers/restaurant.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../utils/multer.js';

const router = Router();

router.route("/").get(getAllRestaurants);
router.route("/:id").get(getRestaurantById);


// Protected Routes
router.route("/").post(
    verifyJWT,
    upload.single("mainImage"),
    createRestaurant
);

router.route("/:restaurantId/menu").post(
    verifyJWT,
    addMenuItem
);


export default router;