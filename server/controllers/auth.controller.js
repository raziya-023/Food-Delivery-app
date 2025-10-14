import { User } from '../models/User.js';

const generateAccessAndRefreshTokens = async (userId) => {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

export const registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;

    if ([name, username, email, password].some((field) => field?.trim() === "")) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existedUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existedUser) {
            return res.status(409).json({ message: "User with username or email already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
            username: username.toLowerCase(),
        });

        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        if (!createdUser) {
            return res.status(500).json({ message: "Something went wrong while registering the user" });
        }

        return res.status(201).json({
            message: "User registered successfully",
            user: createdUser
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, username, password } = req.body;
    const loginInput = email || username;

    if (!loginInput) {
        return res.status(400).json({ message: "Username or email is required" });
    }

    try {
        const user = await User.findOne({
            $or: [{ username: loginInput }, { email: loginInput }]
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "None",
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "User logged in successfully",
                user: loggedInUser,
                accessToken,
            });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const getCurrentUser = async (req, res) => {
    return res.status(200).json({
        message: "Current user fetched successfully",
        user: req.user
    });
};

export const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            { $unset: { refreshToken: 1 } },
            { new: true }
        );

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "None",
        };

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({ message: "User logged out successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error during logout", error: error.message });
    }
};