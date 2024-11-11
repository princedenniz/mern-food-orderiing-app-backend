import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const currentUser = await User.findOne({ _id: req.userId });
        if (!currentUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json(currentUser);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Something went wrong" });
        return;
    }
};

// Controller function to handle user creation
const createCurrentUser = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { auth0Id } = req.body;

        // Check if the user exists
        const existingUser = await User.findOne({ auth0Id });

        if (existingUser) {
            return res.status(200).json(existingUser); // Return user object if it exists
        }

        // Create a new user if not found
        const newUser = new User(req.body);
        await newUser.save();

        // Return the newly created user
        return res.status(201).json(newUser.toObject());
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user" });
    }
};

// Controller function to handle user updates
const updateCurrentUser = async (req: Request, res: Response) => {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;

        await user.save();

        res.json(user);  // Use `res.json()` for consistency in responses
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user" });
    }
};

// Export the functions
export default {
    getCurrentUser,
    createCurrentUser,
    updateCurrentUser,
};
